import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()

        try {
            const headerAuthorization = req.headers.authorization;
            if(!headerAuthorization){
                throw new HttpException({message: 'User has not been aoutorizated'}, HttpStatus.BAD_REQUEST)
            }

            const bearerToken = headerAuthorization.split(' ')[0];
            const token = headerAuthorization.split(' ')[1];
            if(bearerToken !== 'Bearer'  || !token){
                throw new HttpException({message: 'User has not been aoutorizated'}, HttpStatus.BAD_REQUEST)
            }

            const user =  this.jwtService.verify(token);
            req.user = user;

            return true;
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.UNAUTHORIZED)
        }
    }
}