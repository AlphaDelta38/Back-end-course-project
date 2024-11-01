import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {ServiceModel} from "./service.model";


@Module({
  imports: [
      SequelizeModule.forFeature([
         ServiceModel,
      ]),
  ],
  providers: [ServiceService],
  controllers: [ServiceController]
})
export class ServiceModule {}
