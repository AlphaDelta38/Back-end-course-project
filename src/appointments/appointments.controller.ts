import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query} from '@nestjs/common';
import {AppointmentsService} from "./appointments.service";
import {ApiBody, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {AppointmentDto} from "./dto/appointments.dto";
import {getAllAppointmentsDto} from "./dto/getAllAppointments.dto";
import {isNumber} from "@nestjs/common/utils/shared.utils";

@Controller('appointments')
export class AppointmentsController {

    constructor(private appointmentsService: AppointmentsService) {
    }


    @ApiOperation({ summary: 'Create a new appointments' })
    @ApiResponse({ status: 201, description: 'appointments successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Post()
    @ApiBody({ type: AppointmentDto })
    async create(@Body() dto: AppointmentDto){
        try {
            if(!dto.doctor_id || !dto.patient_id){
                throw new HttpException({message: "bad request doctor id or patient id has not been got"}, HttpStatus.BAD_REQUEST)
            }
            return await this.appointmentsService.createAppointment(dto)
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.BAD_REQUEST)
        }
    }


    @ApiOperation({ summary: 'get all the appointments of pattient or doctors, ' })
    @ApiResponse({ status: 201, description: 'appointments successfully sent.' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Get()
    @ApiBody({ type: getAllAppointmentsDto })
    async getAll(@Query() dto: getAllAppointmentsDto){
        try {
            if(dto.type && !dto.id){
                throw new HttpException({message: "id has not been found"}, HttpStatus.BAD_REQUEST)
            }else if(!dto.type && dto.id){
                throw new HttpException({message: "type has of entity has not been found"}, HttpStatus.BAD_REQUEST)
            }
            return await this.appointmentsService.getAllAppointments(dto)
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.BAD_REQUEST)
        }
    }


    @ApiOperation({ summary: 'get one of  the appointments  ' })
    @ApiResponse({ status: 201, description: 'appointments successfully sent.' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Get("/:id")
    async getOne(@Param("id") appointment_id:number){
        try {
            if(!isNumber(Number(appointment_id))){
                throw new HttpException({message: "id is not number"}, HttpStatus.BAD_REQUEST)
            }
            return await this.appointmentsService.getOneAppointment(appointment_id)
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.BAD_REQUEST)
        }
    }

    @ApiOperation({ summary: 'delete one of  the appointments  ' })
    @ApiResponse({ status: 201, description: 'appointments successfully deleted.' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Delete("/:id")
    async delete(@Param("id") appointment_id:number){
        try {
            if(!isNumber(Number(appointment_id))){
                throw new HttpException({message: "id is not number"}, HttpStatus.BAD_REQUEST)
            }
            return await this.appointmentsService.deleteAppointment(appointment_id)
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.BAD_REQUEST)
        }
    }

    @ApiOperation({ summary: 'update one of  the appointments  ' })
    @ApiResponse({ status: 201, description: 'appointments successfully updated.' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Put()
    @ApiBody({ type: AppointmentDto })
    async update(@Body() dto: AppointmentDto){
        try {
            if(!dto.id){
                throw new HttpException({message: "id appointments has no been got"}, HttpStatus.BAD_REQUEST)
            }
            return await this.appointmentsService.updateAppointment(dto)
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.BAD_REQUEST)
        }
    }






}
