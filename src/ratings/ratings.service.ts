import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RatingsModel } from "./ratings.model";
import { CreateRatingsDto } from "./dto/create-ratings.dto";
import { RatingsDto } from "./dto/ratings.dto";
import { GetRatingsDto } from "./dto/get-ratings.dto";
import {DoctorsModel} from "../doctors/doctors.model";
import {PatientsModel} from "../patients/patients.model";

@Injectable()
export class RatingsService {

    constructor(@InjectModel(RatingsModel) private  ratingsRepository: typeof RatingsModel) {}

    async createRating(dto: CreateRatingsDto){
        try {
            const raitignExist = await this.ratingsRepository.findOne({where: {patient_id: dto.patient_id, doctor_id: dto.doctor_id}});
            if(raitignExist){
                const raiting = await this.updateRating(
                    {
                        id: raitignExist.id,
                        doctor_id: dto.doctor_id,
                        patient_id: dto.patient_id,
                        rating: dto.rating
                        }
                );
                return  raiting;
            }else{
                return await this.ratingsRepository.create(dto);
            }
        }catch (e){
            console.log(e)
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllRatings(dto: GetRatingsDto) {
        try {
            if (dto.type === 'doctor') {
                return await this.ratingsRepository.findAll({
                    where: { doctor_id: dto.id },
                    include: { all: true }
                });
            } else if (dto.type === 'patient') {
                return await this.ratingsRepository.findAll({
                    where: { patient_id: dto.id },
                    include: { all: true }
                });
            } else {
                if(Number(dto.limit)){
                    return await this.ratingsRepository.findAll({
                        limit: dto.limit,
                        offset: ((dto.page-1) || 0) * dto.limit,
                        include: [
                            {model: DoctorsModel,attributes: ["first_name", "last_name"]},
                            {model: PatientsModel,attributes: ["first_name", "last_name"]},
                        ],
                    });
                }else{
                    return await this.ratingsRepository.findAll({
                        include: [
                            {model: DoctorsModel,attributes: ["first_name", "last_name"]},
                            {model: PatientsModel,attributes: ["first_name", "last_name"]},
                        ]
                    })
                }
            }
        } catch (e) {
            throw new HttpException({ message: e }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOneRating(rating_id:number){
        try {
          const rating = await this.ratingsRepository.findByPk(Number(rating_id));
          if(!rating){
              throw new HttpException({message: 'Rating not found.'}, HttpStatus.INTERNAL_SERVER_ERROR);
          }
          return rating
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteRating(rating_id:number){
        try {
            return await this.ratingsRepository.destroy({where: {id: rating_id}})
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateRating(dto: RatingsDto){
        try {
            return await this.ratingsRepository.update(dto,{where: {id: dto.id}, returning: true})
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async getAmountOfRatings(){
        try {
            const response = await this.ratingsRepository.findAll()
            if(!response){
                return 0
            }
            return response.length
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
