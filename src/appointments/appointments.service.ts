import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { AppointmentsModel } from "./appointments.model";
import { AppointmentsDto } from "./dto/appointments.dto";
import {GetAppointmentsDto, getBookedTime} from "./dto/get-appointments.dto";
import { PatientsService } from "../patients/patients.service";
import { ServicesService } from "../services/services.service";
import { CreateAppointmentsDto } from "./dto/create-appointments.dto";
import {DoctorsModel} from "../doctors/doctors.model";
import {PatientsModel} from "../patients/patients.model";
import {ServicesModel} from "../services/services.model";
import {DiagnosesModel} from "../diagnoses/diagnoses.model";
import {DoctorsService} from "../doctors/doctors.service";

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectModel(AppointmentsModel) private appointmentsRepository: typeof AppointmentsModel,
        private patientsService : PatientsService,
        private servicesService: ServicesService,
        private doctorService: DoctorsService,
    ){}

    async createAppointment(dto: CreateAppointmentsDto) {
        try {
            const patient = this.patientsService.getOnePatient(dto.patient_id);
            const service = this.servicesService.getOneService(dto.service_id);


            if(await this.checkAppointmentFree(dto.doctor_id, dto.date, dto.time, dto.patient_id)){
                throw new HttpException({ message: 'Time on this date has been booked' }, HttpStatus.BAD_REQUEST);
            }


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
                if(Number(dto.limit)){
                    return await this.appointmentsRepository.findAll({
                        order: [["id", "ASC"]],
                        limit: dto.limit,
                        offset: ((dto.page-1) || 0) * dto.limit,
                        where: { doctor_id: dto.id },
                        include: { all: true }
                    });
                }else{
                    return await this.appointmentsRepository.findAll({
                        order: [["id", "ASC"]],
                        where: { doctor_id: dto.id },
                        include: { all: true }
                    });
                }
            } else if (dto.type === 'patient') {
                if(Number(dto.limit)){
                    return await this.appointmentsRepository.findAll({
                        order: [["id", "ASC"]],
                        limit: dto.limit,
                        offset: ((dto.page-1) || 0) * dto.limit,
                        where: { patient_id: dto.id },
                        include: { all: true }
                    });
                }else{
                    return await this.appointmentsRepository.findAll({
                        order: [["id", "ASC"]],
                        where: { patient_id: dto.id },
                        include: { all: true }
                    });
                }
            } else {
                if(Number(dto.limit)){
                    return await this.appointmentsRepository.findAll(
                        {

                        order: [["id", "ASC"]],
                        limit: dto.limit,
                        offset: ((dto.page-1) || 0) * dto.limit,
                            include: [
                                {
                                    model: DoctorsModel,
                                    attributes: ["first_name", "last_name"],
                                },
                                {
                                    model: ServicesModel,
                                    attributes: ["service"],
                                },
                                {
                                    model: DiagnosesModel,
                                    attributes: ["diagnosis"],
                                },
                                {
                                    model: PatientsModel,
                                    attributes: ["first_name", "last_name"],
                                },
                            ],
                        },
                    );
                }else{
                    return await this.appointmentsRepository.findAll({
                        order: [["id", "ASC"]],
                        include: [
                            {
                                model: DoctorsModel,
                                attributes: ["first_name", "last_name"],
                            },
                            {
                                model: ServicesModel,
                                attributes: ["service"],
                            },
                            {
                                model: DiagnosesModel,
                                attributes: ["diagnosis"],
                            },
                            {
                                model: PatientsModel,
                                attributes: ["first_name", "last_name"],
                            },
                        ],
                    })
                }
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

            if(await this.checkAppointmentFree(dto.doctor_id, dto.date, dto.time, dto.patient_id)){
                throw new HttpException({ message: 'Time on this date has been booked' }, HttpStatus.BAD_REQUEST);
            }
            return await this.appointmentsRepository.update(dto, { where: { id: dto.id } });
        } catch (e) {
            throw new HttpException({ message: e }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async getAppointmentsAmount(){
        const appointments =  await this.appointmentsRepository.findAll()
        if(!appointments){
            return 0;
        }
        return appointments.length
    }

    private async checkAppointmentFree(doctor_id:number, date: string, time: string, patient_id: number){
        try {
            const doctor = await this.doctorService.getOneDoctor(doctor_id, true)
            return doctor.appointments.some((value)=>value.time === time && value.date === date && value.patient_id !== patient_id)
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAllBookedTimeOnDate(dto:  getBookedTime): Promise<string[]>{
        try {
            const doctor = await this.doctorService.getOneDoctor(dto.doctor_id, true)
            const bookedTime: string[] = [];
            doctor.appointments.forEach((value)=>{
                if(!bookedTime.includes(value.time) && value.date == dto.date){
                    bookedTime.push(value.time)
                }
            })
            return bookedTime
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
