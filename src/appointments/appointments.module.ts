import { Module } from '@nestjs/common';
import { SequelizeModule} from "@nestjs/sequelize";
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsModel } from "./appointments.model";

@Module({
  providers: [AppointmentsService],
  controllers: [AppointmentsController],
  imports: [
    SequelizeModule.forFeature([AppointmentsModel])
  ]
})
export class AppointmentsModule {}
