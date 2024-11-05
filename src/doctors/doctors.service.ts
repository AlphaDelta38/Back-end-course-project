import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { DoctorModel  } from "./doctors.model";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { DoctorDto } from "./dto/doctor.dto";


@Injectable()
export class DoctorsService {

    constructor(@InjectModel(DoctorModel) private  doctorsRepository: typeof DoctorModel) {
    }

    async createDoctor(dto: CreateDoctorDto){
        try {
            return await this.doctorsRepository.create(dto);
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
          const doctor = await this.doctorsRepository.findByPk(doctor_id);
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
}
