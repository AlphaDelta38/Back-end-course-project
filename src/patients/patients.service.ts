import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { PatientsModel  } from "./patients.model";
import { CreatePatientsDto } from "./dto/create-patients.dto";
import { PatientsDto } from "./dto/patients.dto";
import * as bcrypt from "bcrypt";
import { RolesModel } from "../roles/roles.model";
import {GetPatientsDto} from "./dto/get-patients.dto";
import {changePassword} from "./dto/change-password.dto";


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

    async getAllPatients(dto: GetPatientsDto){
        try {
            if(Number(dto.limit)){
                return await this.patientsRepository.findAll({attributes: {exclude: ['password']}, limit: dto.limit, offset: (dto.page-1 || 0) * dto.limit});
            }
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
            if(dto.password){
                const hashPassword =  await bcrypt.hash(dto.password, 5);
                return await this.patientsRepository.update({...dto, password: hashPassword},{where: {id: dto.id}})
            }else{
                return await this.patientsRepository.update(dto,{where: {id: dto.id}})
            }
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAmount(){
        try {
            const patients = await this.patientsRepository.findAll({attributes: {exclude: ['password']}});
            if(!patients){
                return 0
            }else{
                return patients.length
            }
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async updateForSelf(dto:Omit<PatientsDto, "id"> , id: number ){
        return await this.updatePatient({...dto, id});
    }


    async changePasswordSelf(dto: changePassword , id: number ){
        const patient = await this.patientsRepository.findByPk(id)
        if(await bcrypt.compare(dto.currentPassword, patient.password)){
            const hashedNewPassword = await bcrypt.hash(dto.newPassword, 5)
            return await this.patientsRepository.update({password: hashedNewPassword}, {where: {id: id}});
        }else{
            throw new HttpException({message: "current password is wrong"}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
