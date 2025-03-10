import { Module } from "@nestjs/common";
import { SequelizeModule} from "@nestjs/sequelize";
import { AppointmentsService } from "./appointments.service";
import { AppointmentsController } from "./appointments.controller";
import { AppointmentsModel } from "./appointments.model";
import { PatientsModule } from "../patients/patients.module";
import { ServicesModule } from "../services/services.module";
import {DoctorsService} from "../doctors/doctors.service";
import {DoctorsModule} from "../doctors/doctors.module";

@Module({
  providers: [AppointmentsService],
  controllers: [AppointmentsController],
  imports: [
    SequelizeModule.forFeature([AppointmentsModel]),
    PatientsModule,
    ServicesModule,
    DoctorsModule
  ],
})
export class AppointmentsModule {}
