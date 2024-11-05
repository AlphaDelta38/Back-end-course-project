import { Module } from '@nestjs/common';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { DoctorModel } from './doctors.model';

@Module({
  controllers: [DoctorsController],
  providers: [DoctorsService], 
  imports: [
    SequelizeModule.forFeature([DoctorModel])
  ],
  exports: [DoctorsService]
})
export class DoctorsModule {}
