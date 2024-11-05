import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreatePatientDto } from 'src/patients/dto/create-patient.dto';
import { LoginPatientDto } from 'src/patients/dto/login-patient.dto';
import { PatientModel } from 'src/patients/patients.model';
import { PatientsService } from 'src/patients/patients.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private patientService: PatientsService,
                private jwtService: JwtService) {}

    private async generateToken(patient: PatientModel) {
        const payload = {
            id: patient.id,
            email: patient.email,
            first_name: patient.first_name,
            last_name: patient.last_name,
            date_of_birth: patient.date_of_birth,
            gender: patient.gender,
            phone: patient.phone,
            address: patient.address,
            insurance_number: patient.insurance_number,
            createdAt: patient.createdAt,
        };
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validatePatient(patientDto: LoginPatientDto) {
        const patient = await this.patientService.getPatientByEmail(patientDto.email);
        
        if (!patient) {
            throw new UnauthorizedException({ message: 'Patient not found.' });
        }
        const passwordEquals = await bcrypt.compare(patientDto.password, patient.password);
        
        if (passwordEquals) {
            return patient;
        }
        
        throw new UnauthorizedException({ message: 'Invalid password.' });
    }

    async login(patientDto: LoginPatientDto) {
        const patient = await this.validatePatient(patientDto)
        return this.generateToken(patient)
    }

    async registration(patientDto: CreatePatientDto) {
        const candidate = await this.patientService.getPatientByEmail(patientDto.email);
        if (candidate) {
            throw new HttpException({message: "Patient with this email exist."}, HttpStatus.BAD_REQUEST);
        }
        const hashPassword =  await bcrypt.hash(patientDto.password, 5);
        const patient = await this.patientService.createPatient({...patientDto, password: hashPassword})
        return this.generateToken(patient)
    }
}
