import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreatePatientsDto } from "src/patients/dto/create-patients.dto";
import { AuthService } from "./auth.service";
import { LoginUsersDto } from "src/dto/login-users.dto";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: LoginUsersDto) {
        return this.authService.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: CreatePatientsDto) {
        return this.authService.registration(userDto)
    }
}
