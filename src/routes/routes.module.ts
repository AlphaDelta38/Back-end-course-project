import {Global, Module} from '@nestjs/common';
import { RoutesController } from './routes.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {RoutesAccessModel} from "./routes-access.model";
import { RoutesService } from './routes.service';

@Global()
@Module({
  imports: [
      SequelizeModule.forFeature([RoutesAccessModel])
  ],
  providers: [RoutesService],
  controllers: [RoutesController],
    exports: [RoutesService]
})
export class RoutesModule {
}
