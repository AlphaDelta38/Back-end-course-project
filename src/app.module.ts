import { Module } from '@nestjs/common';
import * as process from "process";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from '@nestjs/sequelize';
import { ServiceModule } from './service/service.module';
import { ServiceModel } from "./service/service.model";
import { DiagnosesModule } from './diagnoses/diagnoses.module';
import { DiagnosesModel } from "./diagnoses/diagnoses.model";
import { AppointmentsModule } from './appointments/appointments.module';
import { AppointmentsModel } from "./appointments/appointments.model";
import { PatientsModule } from './patients/patients.module';
import { PatientModel } from './patients/patients.model';
import { NewsModule } from './news/news.module';
import { NewsModel } from './news/news.model';
import { AuthModule } from './auth/auth.module';
import { DoctorsModule } from './doctors/doctors.module';
import { DoctorModel } from './doctors/doctors.model';
import { RolesModule } from './roles/roles.module';
import {DoctorRolesModel} from "./roles/doctor-role.model";
import {RolesModel} from "./roles/roles.model";
import { RatingModel } from './ratings/ratings.model';
import { RatingModule } from './ratings/ratings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      // sync: {alter:true},              /// auto-sync with database
      models: [
          ServiceModel,
          DiagnosesModel,
          AppointmentsModel,
          PatientModel,
          NewsModel,
          DoctorModel,
          RolesModel,
          DoctorRolesModel,
          RatingModel,
      ],
      autoLoadModels: true,
    }),
    ServiceModule,
    DiagnosesModule,
    AppointmentsModule,
    PatientsModule,
    NewsModule,
    AuthModule,
    DoctorsModule,
    RolesModule,
    RatingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
