import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { DoctorsModel  } from "./doctors.model";
import { CreateDoctorsDto } from "./dto/create-doctor.dto";
import {DoctorsDto, getAllDoctorParams} from "./dto/doctor.dto";
import { SetDoctorsRolesDto} from "./dto/set-doctors-roles.dto";
import { RolesService} from "../roles/roles.service";
import { RolesModel} from "../roles/roles.model";
import * as bcrypt from "bcrypt";
import * as process from "process";
import {RatingsModel} from "../ratings/ratings.model";
import {AppointmentsModel} from "../appointments/appointments.model";
import {SpecialityModel} from "../speciality/speciality.model";
import {firstValueFrom} from "rxjs";
import {HttpService} from "@nestjs/axios";
import {RoutesService} from "../routes/routes.service";


@Injectable()
export class DoctorsService {

    constructor(
        @InjectModel(DoctorsModel) private  doctorsRepository: typeof DoctorsModel, private roleService: RolesService, private readonly routesService: RoutesService) {}

    async createDoctor(dto: CreateDoctorsDto){
        try {
            const role = await this.roleService.getOneRole(0, 'doctor') 
                || await this.roleService.createRole({ role: 'doctor' });


            const hashPassword =  await bcrypt.hash(dto.password, 5);
            const {roles, ...dtoFiltered } = dto
            const doctor = await this.doctorsRepository.create({...dtoFiltered, password: hashPassword});

            const needRoles: number[] = []

            if(roles.length > 0){
                let allRoles = await this.roleService.getAllRoles()
                allRoles = allRoles.filter((values)=>roles.includes(values.role))

                allRoles.forEach((value)=>{
                    needRoles.push(value.id)
                })
            }

            await this.setDoctorRoles({doctor_id: doctor.id, roles_id: [role.id, ...needRoles]});

            return doctor;
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllDoctors(params: getAllDoctorParams){
        try {

            let doctors: DoctorsModel[] = []

            if(Number(params.limit) !== 0){
                doctors =  await this.doctorsRepository.findAll({
                    limit: params.limit || 5,
                    offset: (params.page-1 || 0)*(params.limit || 0),
                    include: [
                        {
                            model:RolesModel,
                            attributes: ["id", "role"],
                        },
                        {
                            model: RatingsModel,
                            attributes: ["id", "rating"],
                        },
                        {
                            model: AppointmentsModel,
                        },
                        {
                            model: SpecialityModel,
                        }
                    ],
                    attributes: {exclude: [
                            "password",
                            "createdAt",
                            "updatedAt",
                        ]}
                });

            }else{
                console.log("ХФІВХФІВХФІХФВХ")
                doctors =  await this.doctorsRepository.findAll({
                    include: [
                        {
                            model:RolesModel,
                            attributes: ["id", "role"],
                        },
                        {
                            model: RatingsModel,
                            attributes: ["id", "rating"],
                        },
                        {
                            model: AppointmentsModel,
                        },
                        {
                            model: SpecialityModel,
                        }
                    ],
                    attributes: {exclude: [
                            "password",
                            "createdAt",
                            "updatedAt",
                        ]}
                });
            }

            if(params.role && doctors.length > 0){
                doctors = doctors.filter((values)=>values.roles.some((value)=>value.role === params.role));
                doctors = doctors.filter((values)=> !values.roles.some((value)=>value.role ==="admin"));
            }


            return doctors;
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOneDoctor(doctor_id:number, all?: boolean){
        try {

            if(all){
                return await this.doctorsRepository.findByPk(Number(doctor_id),{include: {all: true}})
            }

          const doctor = await this.doctorsRepository.findByPk(doctor_id, {include: [
                  {
                      model: RolesModel,
                  },
                  {
                      model: SpecialityModel
                  }
              ]});
          if(!doctor){
              throw new HttpException({message: 'Doctor not found.'}, HttpStatus.INTERNAL_SERVER_ERROR);
          }
          return doctor
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getDoctorByEmail(email:string){
        try {
          const doctor = await this.doctorsRepository.findOne({where: {email}, include: [
                  {
                      model: RolesModel,
                  }
              ]});
          return doctor
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteDoctor(doctor_id:number){
        try {
            return await this.doctorsRepository.destroy({where: {id: doctor_id}})
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateDoctor(dto: DoctorsDto){
        try {
            const {roles, ...doctorData} = dto
            const doctor =await this.getOneDoctor(doctorData.id)
            if(!doctor){
                throw new HttpException({message: "doctor not found"}, HttpStatus.BAD_REQUEST)
            }

            let newHashPassword;
            if(dto.password){
                newHashPassword =  await bcrypt.hash(dto.password, 5);
            }


            const willDelete:number[]= [];

            doctor.roles.forEach((value)=>{
                if(!roles.includes(value.role)){
                    willDelete.push(value.id)
                }
            })

            for (const value of willDelete){
                const errorCheck = await this.deleteRole(doctor.id, value)
            }

            const needRoles: number[] = []

            if(roles.length > 0){
                let allRoles = await this.roleService.getAllRoles()
                allRoles = allRoles.filter((values)=>roles.includes(values.role))
                allRoles.forEach((value)=>{
                    needRoles.push(value.id)
                })
            }

            await this.setDoctorRoles({doctor_id: doctor.id, roles_id: needRoles})

            let updatedDoctor;

            if(newHashPassword){
                 updatedDoctor = await this.doctorsRepository.update({...doctorData, password: newHashPassword}, {where: {id: doctor.id}})
            }else{
                 updatedDoctor = await this.doctorsRepository.update(doctorData, {where: {id: doctor.id}})

            }

            return updatedDoctor;
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async setDoctorRoles(dto : SetDoctorsRolesDto){
        try {
            for (const value of dto.roles_id) {
                const error = await this.setRole(dto.doctor_id, Number(value));
                if(error !== 1){
                    throw error;
                }
            }
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteRole(doctor_id: number, role_id: number){
        try {

            const doctor = await this.doctorsRepository.findByPk(doctor_id);
            const role = await this.roleService.getOneRole(role_id);

            if(!doctor || !role){
                throw new HttpException({message: 'Doctor or Role not found'}, HttpStatus.BAD_REQUEST);
            }

            await doctor.$remove('roles', role.id)
            return  1;
        }catch (e){
            return  new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async setRole(doctor_id: number, role_id: number){
        try {

            const doctor = await this.doctorsRepository.findByPk(doctor_id);
            const role = await this.roleService.getOneRole(role_id);

            if(!doctor || !role){
                throw new HttpException({message: 'Doctor or Role not found'}, HttpStatus.BAD_REQUEST);
            }

            await doctor.$add('roles', role.id)
            return  1;
        }catch (e){
           return  new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async onModuleInit() {
        try {
            await this.createAdminDoctor();
        } catch (error) {
            console.error('Error initializing admin doctor:', error);
        }
    }

    async getAmountDoctors(){
        try {
            const doctors = await this.doctorsRepository.findAll({include: {model: RolesModel}})
            const withoutAdmin = doctors.filter((value)=>value.roles.every((value)=>value.role !=="admin")).length

            return withoutAdmin
        }catch (e){
            return  new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async createAdminDoctor() {
        try {
            const adminEmail = process.env.ADMIN_EMAIL;
            const existingAdmin = await this.getDoctorByEmail(adminEmail);


            if (!existingAdmin) {
                const adminRole = await this.roleService.getOneRole(0, process.env.ADMIN_ROLE)
                    || await this.roleService.createRole({ role: process.env.ADMIN_ROLE });

                const hashPassword =  await bcrypt.hash(process.env.ADMIN_PASSWORD, 5);
                const adminDoctorDto: CreateDoctorsDto = {
                    first_name: process.env.ADMIN_FIRST_NAME,
                    last_name: process.env.ADMIN_LAST_NAME,
                    date_of_birth: new Date(process.env.ADMIN_DATE_OF_BIRTH),
                    gender: process.env.ADMIN_GENDER,
                    email: adminEmail,
                    password: hashPassword
                };

                const adminDoctor = await this.doctorsRepository.create(adminDoctorDto);
                await this.setDoctorRoles({ doctor_id: adminDoctor.id, roles_id: [adminRole.id] });
                const routes:string[] = await this.routesService.getRoutes()
                await this.routesService.createRolesAccess({role_id: adminRole.id, routes: routes})
            }
        }catch (e){
            console.log(e)
        }
    }




}
