import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { PatientsModel  } from "./patients.model";
import { CreatePatientsDto } from "./dto/create-patients.dto";
import { PatientsDto } from "./dto/patients.dto";
import * as bcrypt from "bcrypt";
import {RolesModel} from "../roles/roles.model";


@Injectable()
export class PatientsService {

    constructor(@InjectModel(PatientsModel) private  patientsRepository: typeof PatientsModel) {
    }

    async createPatient(dto: CreatePatientsDto){
        try {
            const hashPassword =  await bcrypt.hash(dto.password, 5);
            return await this.patientsRepository.create({...dto, password: hashPassword});
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllPatients(){
        try {
            return await this.patientsRepository.findAll({attributes: {exclude: ['password']}});
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOnePatient(patient_id:number){
        try {
          const patient = await this.patientsRepository.findByPk(patient_id, {attributes: {exclude: ['password']}});
          if(!patient){
              throw new HttpException({message: 'Patient not found.'}, HttpStatus.INTERNAL_SERVER_ERROR);
          }
          return patient
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getPatientByEmail(email:string){
        try {
          const patient = await this.patientsRepository.findOne({where: {email}});
          return patient
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deletePatient(patient_id:number){
        try {
            return await this.patientsRepository.destroy({where: {id: patient_id}})
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updatePatient(dto: PatientsDto){
        try {
            return await this.patientsRepository.update(dto,{where: {id: dto.id}})
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
