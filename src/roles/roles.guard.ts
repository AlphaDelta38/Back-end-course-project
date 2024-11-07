import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./roles.decorator";
import {DoctorsService} from "../doctors/doctors.service";
import {RolesModel} from "./roles.model";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
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

            return roles.some(value => requiredRoles.includes(value.role))
        }catch (e){
            throw  new HttpException({message: e}, HttpStatus.FORBIDDEN)
        }
    }

}