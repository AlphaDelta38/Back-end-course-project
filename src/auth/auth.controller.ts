import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePatientDto } from 'src/patients/dto/create-patient.dto';
import { AuthService } from './auth.service';
import { LoginPatientDto } from 'src/patients/dto/login-patient.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: LoginPatientDto) {
        return this.authService.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: CreatePatientDto) {
        return this.authService.registration(userDto)
    }
}
