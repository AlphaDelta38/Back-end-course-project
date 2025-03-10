import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles.decorator";
import { RolesModel } from "./roles.model";
import {RoutesService} from "../routes/routes.service";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector, private routeService: RoutesService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const req = context.switchToHttp().getRequest()
            const requiredRoles: string[] = this.reflector.getAllAndOverride(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ])

            if(!requiredRoles){
                return  true
            }
            const roles: RolesModel[] = req.user.roles

            if(!roles){
                return false
            }

            const results = await Promise.all(roles.map(role => this.checkRole(role.id)));

            if(results[0]?.routes){
                for (const roleAccess of results){
                    if(roleAccess.routes.includes(requiredRoles[0])){
                        return true
                    }
                }
            }

            return false
        }catch (e){
            throw  new HttpException({message: e}, HttpStatus.FORBIDDEN)
        }
    }

    async checkRole(id:number){
        return await this.routeService.getOneById(id)
    }


}