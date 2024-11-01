import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {DiagnosesModel} from "./diagnoses.model";
import {DiagnosesDto} from "./dto/diagnoses.dto";

@Injectable()
export class DiagnosesService {

    constructor(@InjectModel(DiagnosesModel) private  diagnosesRepository: typeof DiagnosesModel) {
    }


    async createDiagnosis(dto: DiagnosesDto){
        try {
            return await this.diagnosesRepository.create(dto);
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllDiagnoses(){
        try {
            return await this.diagnosesRepository.findAll();
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOneDiagnosis(diagnosis_id:number){
        try {
          const diagnosis = await this.diagnosesRepository.findByPk(diagnosis_id);
          if(!diagnosis){
              throw new HttpException({message: "diagnosis not found"}, HttpStatus.INTERNAL_SERVER_ERROR);
          }
          return diagnosis
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteDiagnosis(diagnosis_id:number){
        try {
            return await this.diagnosesRepository.destroy({where: {id: diagnosis_id}})
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
