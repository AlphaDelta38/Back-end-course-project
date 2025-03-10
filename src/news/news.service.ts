import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { NewsModel } from "./news.model";
import { CreateNewsDto } from "./dto/create-news.dto";
import {NewsDto, params} from "./dto/news.dto";


@Injectable()
export class NewsService {

    constructor(@InjectModel(NewsModel) private  newsRepository: typeof NewsModel) {
    }

    async createNews(dto: CreateNewsDto){
        try {
            return await this.newsRepository.create(dto);
        }catch (e){
            console.log(e)
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllNews(params: params){
        try {
            const allNews =  await this.newsRepository.findAll({
                limit: params.limit || 5,
                offset: (params.page-1 || 0) * (params.limit || 0),
            });


            if(params.sortForward){
                if(params.sortForward === "ascending"){
                    allNews.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                }else if(params.sortForward === "descending"){
                    allNews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                }
            }

            return allNews;
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOneNews(news_id:number){
        try {
          const news = await this.newsRepository.findByPk(news_id);
          if(!news){
              throw new HttpException({message: 'News not found.'}, HttpStatus.INTERNAL_SERVER_ERROR);
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

    async getAmountOfNews(){
        try {
            return await this.newsRepository.findAll().then(value => value.length)
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
