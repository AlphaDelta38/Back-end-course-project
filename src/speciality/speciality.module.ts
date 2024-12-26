import { Module } from '@nestjs/common';
import { SpecialityService } from './speciality.service';
import { SpecialityController } from './speciality.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {SpecialityModel} from "./speciality.model";


@Module({
  providers: [SpecialityService],
  controllers: [SpecialityController],
  exports: [SpecialityService],
  imports: [
      SequelizeModule.forFeature([SpecialityModel])
  ]
})

export class SpecialityModule {
}
