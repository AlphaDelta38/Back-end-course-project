import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { DoctorModel  } from "./doctors.model";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { DoctorDto } from "./dto/doctor.dto";
import {setDoctorRolesDto} from "./dto/setDoctorRoles.dto";
import {RolesService} from "../roles/roles.service";
import {RolesModel} from "../roles/roles.model";
import * as bcrypt from 'bcrypt';


@Injectable()
export class DoctorsService {

    constructor(@InjectModel(DoctorModel) private  doctorsRepository: typeof DoctorModel, private roleService: RolesService) {
    }

    async createDoctor(dto: CreateDoctorDto){
        try {
            let role = await this.roleService.getOneRole(0, "doctor");
            if(!role){
                role = await this.roleService.createRole({role: "doctor"})
            }
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
              throw new HttpException({message: "Doctor not found."}, HttpStatus.INTERNAL_SERVER_ERROR);
          }
          return doctor
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getDoctorByEmail(email:string){
        try {
          const doctor = await this.doctorsRepository.findOne({where: {email}});
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

    async updateDoctor(dto: DoctorDto){
        try {
            return await this.doctorsRepository.update(dto,{where: {id: dto.id}})
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async setDoctorRoles(dto : setDoctorRolesDto){
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
                throw new HttpException({message: "doctor or role not found"}, HttpStatus.BAD_REQUEST);
            }

            await doctor.$add("roles", role.id)
            return  1;
        }catch (e){
           return  new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
