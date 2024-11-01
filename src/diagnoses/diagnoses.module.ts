import { Module } from '@nestjs/common';
import { DiagnosesService } from './diagnoses.service';
import { DiagnosesController } from './diagnoses.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {DiagnosesModel} from "./diagnoses.model";

@Module({
  imports: [
      SequelizeModule.forFeature([
          DiagnosesModel
      ]),
  ],
  providers: [DiagnosesService],
  controllers: [DiagnosesController]
})
export class DiagnosesModule {}
