import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreatePatientsDto } from "src/patients/dto/create-patients.dto";
import { PatientsModel } from "src/patients/patients.model";
import { PatientsService } from "src/patients/patients.service";
import { DoctorsModel } from "src/doctors/doctors.model";
import { DoctorsService } from "src/doctors/doctors.service";
import { LoginUsersDto } from "src/dto/login-users.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private patientService: PatientsService,
        private doctorService: DoctorsService,
        private jwtService: JwtService
    ) {}

    private async generateToken(user: PatientsModel | DoctorsModel) {
        const payload = {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            date_of_birth: user.date_of_birth,
            gender: user.gender,
            phone: user.phone,
            address: user.address,
            ...(user instanceof PatientsModel
                ? { insurance_number: user.insurance_number }
                : { office_number: user.office_number, speciality: user.speciality, image_link: user.image_link , roles: user.roles}),
            createdAt: user.createdAt,
        };

        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async getUserByEmail(email: string, isPatient: boolean) {
        return isPatient
            ? await this.patientService.getPatientByEmail(email)
            : await this.doctorService.getDoctorByEmail(email);
    }

    private async validateUser(userDto: LoginUsersDto) {
        const user = await this.getUserByEmail(userDto.email, userDto.isPatient);
        if (!user) throw new UnauthorizedException({ message: 'User not found.' });

        const isPasswordValid = await bcrypt.compare(userDto.password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException({ message: 'Invalid password.' });

        return user;
    }

    async login(userDto: LoginUsersDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(patientDto: CreatePatientsDto) {
        const candidate = await this.patientService.getPatientByEmail(patientDto.email);
        if (candidate) {
            throw new HttpException({message: 'Patient with this email exist.'}, HttpStatus.BAD_REQUEST);
        }
        const patient = await this.patientService.createPatient(patientDto);
        return this.generateToken(patient);
    }


    async checkAuth(user: PatientsModel | DoctorsModel) {
        try {
            //@ts-ignore
            if(!user?.roles) {
                const patient = await this.patientService.getOnePatient(user.id)
                return this.generateToken(patient)
            }else{
                const doctor = await this.doctorService.getOneDoctor(user.id)
                return this.generateToken(doctor)
            }
        }catch (e){
            throw  new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
