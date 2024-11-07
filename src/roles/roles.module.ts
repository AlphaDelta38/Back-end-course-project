import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { RolesModel } from "./roles.model";
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
      SequelizeModule.forFeature([RolesModel]),
  ],
    exports: [RolesService]
})
export class RolesModule {}
