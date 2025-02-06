import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {RoutesAccessModel} from "./routes-access.model";
import {CreateAccessDto} from "./dto/create-Access.dto";
import {HttpAdapterHost} from "@nestjs/core";

@Injectable()
export class RoutesService {

    constructor(@InjectModel(RoutesAccessModel) private routesAccessRepository: typeof RoutesAccessModel, private readonly httpAdapterHost: HttpAdapterHost) {
    }


    async createRolesAccess(dto: CreateAccessDto){
        const access = await this.routesAccessRepository.findByPk(dto.role_id);

        if(access?.role_id === 1){
            throw new HttpException("that role cant be update for access", HttpStatus.NOT_FOUND);
        }



        if(access){
            return await this.updateRoleAccess(dto)
        }
        const newAccess = await this.routesAccessRepository.create(dto);
        return newAccess
    }

    async getOneById(id: number){
        const response = await this.routesAccessRepository.findByPk(id)
        if(!response){
            throw new HttpException({message:"Not found with the same id ", }, HttpStatus.BAD_REQUEST)
        }
        return response
    }


    async updateRoleAccess(dto: CreateAccessDto){
        return await this.routesAccessRepository.update(dto, {where: {role_id: dto.role_id}});
    }

    async getRoutes() {

        const server = this.httpAdapterHost.httpAdapter.getInstance();
        const router = server._router;

        return router.stack
            .map((layer) => {
                if (layer.route) {
                    const path = layer.route.path;
                    const method = layer.route.stack[0].method;
                    return `${method.toUpperCase()} ${path}`;
                }
            })
            .filter((route) => route !== undefined && !route.includes('/api') && !route.includes('/auth'));
    }

}
