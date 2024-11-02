import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PatientModel } from './patients.model';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService], 
  imports: [
    SequelizeModule.forFeature([PatientModel])
  ],
  exports: [PatientsService]
})
export class PatientsModule {}
