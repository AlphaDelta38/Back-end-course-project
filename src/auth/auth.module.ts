import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PatientsModule } from 'src/patients/patients.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    PatientsModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'secret_key',
      signOptions: {
        expiresIn: '30m'
      }
    })
  ]
})
export class AuthModule {}
