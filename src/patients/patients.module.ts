import { Module } from "@nestjs/common";
import { PatientsController } from "./patients.controller";
import { PatientsService } from "./patients.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { PatientsModel } from "./patients.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [PatientsController],
  providers: [PatientsService], 
  imports: [
    SequelizeModule.forFeature([PatientsModel]),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'secret_key',
      signOptions: {
        expiresIn: '24h'
      }
    }),
  ],
  exports: [PatientsService]
})
export class PatientsModule {}
