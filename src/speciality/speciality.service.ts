import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {SpecialityModel} from "./speciality.model";
import {specialityDto} from "./dto/speciality.dto";
import {specialityUpdateDto} from "./dto/specialityUpdate.dto";

@Injectable()
export class SpecialityService {

    constructor(@InjectModel(SpecialityModel) private specialityModel: typeof SpecialityModel) {
    }


    async createSpeciality(dto: specialityDto) {
        try {
            const speciality = await this.specialityModel.create(dto)
            if(!speciality){
                throw new HttpException({message: "Bad request for create speciality "}, HttpStatus.BAD_REQUEST)
            }
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    async getAllSpeciality() {
        try {
            return await this.specialityModel.findAll()
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getOneSpecialty(id: number) {
        try {
            return await this.specialityModel.findByPk(id)
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateSpecialty(dto: specialityUpdateDto ) {
        try {
            const updatedSpeciality = await this.specialityModel.update(dto, {where: {id: dto.id}})
            if(!updatedSpeciality){
                throw new HttpException({message: "Bad request for update of speciality "}, HttpStatus.BAD_REQUEST)
            }
            return updatedSpeciality
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    async deleteSpecialty(id: number) {
        try {
            return await this.specialityModel.destroy({where: {id: id}})
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
