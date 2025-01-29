import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { DiagnosesModel } from "./diagnoses.model";
import { CreateDiagnosesDto } from "./dto/create-diagnoses.dto";
import {DiagnosesDto, getAllDiagnosesParams} from "./dto/diagnoses.dto";

@Injectable()
export class DiagnosesService {
    
    constructor(@InjectModel(DiagnosesModel) private diagnosesRepository: typeof DiagnosesModel) {}

    async createDiagnosis(dto: CreateDiagnosesDto) {
        try {
            return await this.diagnosesRepository.create(dto);
        } catch (e) {
            throw new HttpException({ message: e }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllDiagnoses(dto: getAllDiagnosesParams) {
        try {

            if(dto.limit){
                return await this.diagnosesRepository.findAll({limit: dto.limit, offset: (dto.page-1) * dto.limit});
            }else{
                return await this.diagnosesRepository.findAll();
            }

        } catch (e) {
            throw new HttpException({ message: e }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOneDiagnosis(diagnosis_id: number) {
        try {
            const diagnosis = await this.diagnosesRepository.findByPk(diagnosis_id);
            if (!diagnosis) {
                throw new HttpException({ message: 'Diagnosis not found.' }, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return diagnosis;
        } catch (e) {
            throw new HttpException({ message: e }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteDiagnosis(diagnosis_id: number) {
        try {
            return await this.diagnosesRepository.destroy({ where: { id: Number(diagnosis_id )} });
        } catch (e) {
            throw new HttpException({ message: e }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateDiagnosis(dto: DiagnosesDto) {
        try {
            return await this.diagnosesRepository.update(dto, { where: { id: Number(dto.id) } });
        } catch (e) {
            throw new HttpException({ message: e }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async getAmount(){
        const diagnoses = await this.diagnosesRepository.findAll()
        if(!diagnoses){
            return 0
        }
        return diagnoses.length
    }

}
