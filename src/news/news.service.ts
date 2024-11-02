import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { NewsModel } from "./news.model";
import { CreateNewsDto } from "./dto/create-news.dto";
import { NewsDto } from "./dto/news.dto";


@Injectable()
export class NewsService {

    constructor(@InjectModel(NewsModel) private  newsRepository: typeof NewsModel) {
    }

    async createNews(dto: CreateNewsDto){
        try {
            return await this.newsRepository.create(dto);
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllNews(){
        try {
            return await this.newsRepository.findAll();
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOneNews(news_id:number){
        try {
          const news = await this.newsRepository.findByPk(news_id);
          if(!news){
              throw new HttpException({message: "News not found."}, HttpStatus.INTERNAL_SERVER_ERROR);
          }
          return news
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteNews(news_id:number){
        try {
            return await this.newsRepository.destroy({where: {id: news_id}})
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateNews(dto: NewsDto){
        try {
            return await this.newsRepository.update(dto,{where: {id: dto.id}})
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
