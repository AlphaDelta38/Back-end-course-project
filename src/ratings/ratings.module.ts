import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { RatingsController } from "./ratings.controller";
import { RatingsService } from "./ratings.service";
import { RatingsModel } from "./ratings.model";
import {PatientsModule} from "../patients/patients.module";
import {DoctorsModule} from "../doctors/doctors.module";

@Module({
  controllers: [RatingsController],
  providers: [RatingsService], 
  imports: [
    SequelizeModule.forFeature([RatingsModel]),
      PatientsModule,
      DoctorsModule,
  ]
})
export class RatingsModule {}
