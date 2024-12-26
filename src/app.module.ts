import { Module } from '@nestjs/common';
import * as process from "process";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from '@nestjs/sequelize';
import { ServicesModule } from './services/services.module';
import { ServicesModel } from "./services/services.model";
import { DiagnosesModule } from './diagnoses/diagnoses.module';
import { DiagnosesModel } from "./diagnoses/diagnoses.model";
import { AppointmentsModule } from './appointments/appointments.module';
import { AppointmentsModel } from "./appointments/appointments.model";
import { PatientsModule } from './patients/patients.module';
import { PatientsModel } from './patients/patients.model';
import { NewsModule } from './news/news.module';
import { NewsModel } from './news/news.model';
import { AuthModule } from './auth/auth.module';
import { DoctorsModule } from './doctors/doctors.module';
import { DoctorsModel } from './doctors/doctors.model';
import { RolesModule } from './roles/roles.module';
import { DoctorsRolesModel } from "./roles/doctors-roles.model";
import { RolesModel } from "./roles/roles.model";
import { RatingsModel } from './ratings/ratings.model';
import { RatingsModule } from './ratings/ratings.module';
import { SpecialityModule } from './speciality/speciality.module';
import {SpecialityModel} from "./speciality/speciality.model";

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
          ServicesModel,
          DiagnosesModel,
          AppointmentsModel,
          PatientsModel,
          NewsModel,
          DoctorsModel,
          RolesModel,
          DoctorsRolesModel,
          RatingsModel,
          SpecialityModel,
      ],
      autoLoadModels: true,
    }),
    ServicesModule,
    DiagnosesModule,
    AppointmentsModule,
    PatientsModule,
    NewsModule,
    AuthModule,
    DoctorsModule,
    RolesModule,
    RatingsModule,
    SpecialityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
