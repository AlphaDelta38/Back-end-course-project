import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { NewsController } from "./news.controller";
import { NewsService } from "./news.service";
import { NewsModel } from "./news.model";

@Module({
  controllers: [NewsController],
  providers: [NewsService], 
  imports: [
    SequelizeModule.forFeature([NewsModel])
  ]
})
export class NewsModule {}
