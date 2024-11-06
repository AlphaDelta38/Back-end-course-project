import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { RatingModel } from './ratings.model';
import { CreateRatingDto } from './dto/create-rating.dto';
import { RatingDto } from './dto/rating.dto';
import { GetRatingsDto } from './dto/get-ratings.dto';

@Injectable()
export class RatingsService {

    constructor(@InjectModel(RatingModel) private  ratingsRepository: typeof RatingModel) {
    }

    async createRating(dto: CreateRatingDto){
        try {
            return await this.ratingsRepository.create(dto);
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllRatings(dto: GetRatingsDto) {
        try {
            if (dto.type === "doctor") {
                return await this.ratingsRepository.findAll({
                    where: { doctor_id: dto.id },
                    include: { all: true }
                });
            } else if (dto.type === "patient") {
                return await this.ratingsRepository.findAll({
                    where: { patient_id: dto.id },
                    include: { all: true }
                });
            } else {
                return await this.ratingsRepository.findAll({ include: { all: true } });
            }
        } catch (e) {
            throw new HttpException({ message: e }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOneRating(rating_id:number){
        try {
          const rating = await this.ratingsRepository.findByPk(rating_id);
          if(!rating){
              throw new HttpException({message: "Rating not found."}, HttpStatus.INTERNAL_SERVER_ERROR);
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

    async updateRating(dto: RatingDto){
        try {
            return await this.ratingsRepository.update(dto,{where: {id: dto.id}})
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
