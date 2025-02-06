import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { RolesModel } from "./roles.model";
import { RolesService } from "./roles.service";
import { RolesController } from "./roles.controller";
import { DoctorsModule } from "../doctors/doctors.module";
import {RoutesModule} from "../routes/routes.module";


@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
      SequelizeModule.forFeature([RolesModel]),
      forwardRef(()=>DoctorsModule),
      RoutesModule,
  ],
    exports: [RolesService]
})
export class RolesModule {}
