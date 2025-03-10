import { Module } from "@nestjs/common";
import { ServicesService } from "./services.service";
import { ServicesController } from "./services.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { ServicesModel } from "./services.model";

@Module({
  providers: [ServicesService],
  controllers: [ServicesController],
  imports: [
    SequelizeModule.forFeature([ServicesModel])
  ],
  exports: [ServicesService]
})
export class ServicesModule {}
