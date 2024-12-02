import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { DoctorsModel  } from "./doctors.model";
import { CreateDoctorsDto } from "./dto/create-doctor.dto";
import { DoctorsDto } from "./dto/doctor.dto";
import { SetDoctorsRolesDto} from "./dto/set-doctors-roles.dto";
import { RolesService} from "../roles/roles.service";
import { RolesModel} from "../roles/roles.model";
import * as bcrypt from "bcrypt";
import * as process from "process";


@Injectable()
export class DoctorsService {

    constructor(@InjectModel(DoctorsModel) private  doctorsRepository: typeof DoctorsModel, private roleService: RolesService) {
    }

    async createDoctor(dto: CreateDoctorsDto){
        try {
            const role = await this.roleService.getOneRole(0, 'doctor') 
                || await this.roleService.createRole({ role: 'doctor' });

            const hashPassword =  await bcrypt.hash(dto.password, 5);
            const doctor = await this.doctorsRepository.create({...dto, password: hashPassword});
            await this.setDoctorRoles({doctor_id: doctor.id, roles_id: [role.id]});

            return doctor;
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllDoctors(){
        try {
            return await this.doctorsRepository.findAll();
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOneDoctor(doctor_id:number){
        try {
          const doctor = await this.doctorsRepository.findByPk(doctor_id, {include: [
                  {
                      model: RolesModel,
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
            return await this.doctorsRepository.update(dto,{where: {id: dto.id}})
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
            }
        }catch (e){
            console.log(e)
        }
    }

}
