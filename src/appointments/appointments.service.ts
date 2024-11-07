import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { AppointmentsModel } from "./appointments.model";
import { AppointmentsDto } from "./dto/appointments.dto";
import { GetAppointmentsDto } from "./dto/get-appointments.dto";
import { PatientsService } from "../patients/patients.service";
import { ServicesService } from "../services/services.service";
import { CreateAppointmentsDto } from "./dto/create-appointments.dto";

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectModel(AppointmentsModel) private appointmentsRepository: typeof AppointmentsModel,
        private patientsService : PatientsService,
        private servicesService: ServicesService,
    ){}

    async createAppointment(dto: CreateAppointmentsDto) {
        try {
            const patient = this.patientsService.getOnePatient(dto.patient_id);
            const service = this.servicesService.getOneService(dto.service_id);
            if(!patient){
                throw new HttpException({ message: 'patient not found' }, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if(!service){
                throw new HttpException({ message: 'service not found' }, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return await this.appointmentsRepository.create(dto);
        } catch (e) {
            throw new HttpException({ message: e }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllAppointments(dto: GetAppointmentsDto) {
        try {
            if (dto.type === 'doctor') {
                return await this.appointmentsRepository.findAll({
                    where: { doctor_id: dto.id },
                    include: { all: true }
                });
            } else if (dto.type === 'patient') {
                return await this.appointmentsRepository.findAll({
                    where: { patient_id: dto.id },
                    include: { all: true }
                });
            } else {
                return await this.appointmentsRepository.findAll({ include: { all: true } });
            }
        } catch (e) {
            throw new HttpException({ message: e }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOneAppointment(appointments_id: number) {
        try {
            const appointment = await this.appointmentsRepository.findByPk(appointments_id, { include: { all: true } });
            if (!appointment) {
                throw new HttpException({ message: 'Appointment not found.' }, HttpStatus.BAD_REQUEST);
            }
            return appointment;
        } catch (e) {
            throw new HttpException({ message: e }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteAppointment(appointments_id: number) {
        try {
            return await this.appointmentsRepository.destroy({ where: { id: appointments_id } });
        } catch (e) {
            throw new HttpException({ message: e }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateAppointment(dto: AppointmentsDto) {
        try {
            return await this.appointmentsRepository.update(dto, { where: { id: dto.id } });
        } catch (e) {
            throw new HttpException({ message: e }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
