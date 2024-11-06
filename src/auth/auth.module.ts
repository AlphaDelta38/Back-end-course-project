import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PatientsModule } from 'src/patients/patients.module';
import { JwtModule } from '@nestjs/jwt';
import { DoctorsModule } from 'src/doctors/doctors.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    PatientsModule,
    DoctorsModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'secret_key',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ]
})
export class AuthModule {}
