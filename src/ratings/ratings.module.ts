import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RatingsController } from './ratings.controller';
import { RatingsService } from './ratings.service';
import { RatingModel } from './ratings.model';

@Module({
  controllers: [RatingsController],
  providers: [RatingsService], 
  imports: [
    SequelizeModule.forFeature([RatingModel])
  ]
})
export class RatingModule {}
