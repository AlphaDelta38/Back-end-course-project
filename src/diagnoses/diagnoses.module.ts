import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { DiagnosesController } from "./diagnoses.controller";
import { DiagnosesService } from "./diagnoses.service";
import { DiagnosesModel } from "./diagnoses.model";

@Module({
  controllers: [DiagnosesController],
  providers: [DiagnosesService], 
  imports: [
    SequelizeModule.forFeature([DiagnosesModel])
  ]
})
export class DiagnosesModule {}
