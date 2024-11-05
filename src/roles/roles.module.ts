import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {RolesModel} from "./roles.model";
import {DoctorRolesModel} from "./doctor-role.model";

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
      SequelizeModule.forFeature([
          RolesModel,
      ]),
  ],
    exports: [RolesService]
})
export class RolesModule {}
