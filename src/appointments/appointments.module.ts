import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {AppointmentsModel} from "./appointments.model";

@Module({
  imports: [
      SequelizeModule.forFeature([
          AppointmentsModel
      ]),
  ],
  providers: [AppointmentsService],
  controllers: [AppointmentsController]
})
export class AppointmentsModule {}
