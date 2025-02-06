import { forwardRef, Module } from "@nestjs/common";
import { DoctorsController } from "./doctors.controller";
import { DoctorsService } from "./doctors.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { DoctorsModel } from "./doctors.model";
import { RolesModule } from "../roles/roles.module";
import {RoutesModule} from "../routes/routes.module";


@Module({
  controllers: [DoctorsController],
  providers: [DoctorsService], 
  imports: [
    SequelizeModule.forFeature([DoctorsModel]),
    forwardRef(()=>RolesModule),
      RoutesModule,
  ],
  exports: [DoctorsService]
})
export class DoctorsModule {}
