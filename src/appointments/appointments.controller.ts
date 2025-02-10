import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    UseGuards
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { isNumber } from "@nestjs/common/utils/shared.utils";
import { AppointmentsService } from "./appointments.service";
import { AppointmentsDto } from "./dto/appointments.dto";
import {GetAppointmentsDto, getBookedTime} from "./dto/get-appointments.dto";
import { CreateAppointmentsDto } from "./dto/create-appointments.dto";
import {Roles} from "../roles/roles.decorator";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../roles/roles.guard";

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {

    constructor(private appointmentsService: AppointmentsService) {}

    @ApiOperation({ summary: 'Create a new appointment' })
    @ApiResponse({ status: 201, description: 'Appointment successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Post()
    @ApiBody({ type: CreateAppointmentsDto })
    async create(@Body() dto: CreateAppointmentsDto) {
        if (!dto.doctor_id || !dto.patient_id) {
            throw new HttpException({ message: 'Doctor ID or Patient ID is required.' }, HttpStatus.BAD_REQUEST);
        }
        return await this.appointmentsService.createAppointment(dto);
    }




    @ApiOperation({ summary: 'Get Amount of Appointments' })
    @ApiResponse({ status: 200, description: 'Amount successfully retrieved.' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Get("/get/amount")
    async getAmount(@Query() dto:GetAppointmentsDto) {
        return await this.appointmentsService.getAppointmentsAmount();
    }

    @Get()
    @ApiOperation({ summary: 'Get all appointments for a specific patient or doctor' })
    @ApiResponse({ status: 200, description: 'Appointments successfully retrieved.' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiQuery({ name: 'type', required: false, description: 'Type of entity (doctor or patient)' })
    @ApiQuery({ name: 'id', required: false, description: 'ID of the entity' })
    async getAll(@Query() dto: GetAppointmentsDto) {
        if (dto.type && !dto.id) {
            throw new HttpException({ message: 'ID is required when type is specified.' }, HttpStatus.BAD_REQUEST);
        } else if (!dto.type && dto.id) {
            throw new HttpException({ message: 'Type of entity is required when ID is specified.' }, HttpStatus.BAD_REQUEST);
        }
        return await this.appointmentsService.getAllAppointments(dto);
    }

    @ApiOperation({ summary: 'Get a specific appointment' })
    @ApiResponse({ status: 200, description: 'Appointment successfully retrieved.' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Get('/:id')
    async getOne(@Param('id') appointment_id: number) {
        if (!isNumber(Number(appointment_id))) {
            throw new HttpException({ message: 'Appointment ID must be a number.' }, HttpStatus.BAD_REQUEST);
        }
        return await this.appointmentsService.getOneAppointment(appointment_id);
    }

    @ApiOperation({ summary: 'Delete a specific appointment' })
    @ApiResponse({ status: 200, description: 'Appointment successfully deleted.' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Roles("DELETE /appointments/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('/:id')
    async delete(@Param('id') appointment_id: number) {
        console.log(appointment_id)
        if (!isNumber(Number(appointment_id))) {
            throw new HttpException({ message: 'Appointment ID must be a number.' }, HttpStatus.BAD_REQUEST);
        }
        return await this.appointmentsService.deleteAppointment(appointment_id);
    }

    @ApiOperation({ summary: 'Update a specific appointment' })
    @ApiResponse({ status: 200, description: 'Appointment successfully updated.' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Roles("PUT /appointments")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put()
    @ApiBody({ type: AppointmentsDto })
    async update(@Body() dto: AppointmentsDto) {
        if (!dto.id) {
            throw new HttpException({ message: 'Appointment ID is required.' }, HttpStatus.BAD_REQUEST);
        }
        return await this.appointmentsService.updateAppointment(dto);
    }

    @ApiOperation({ summary: 'Get all bookedTime of Appointment that one doctor'})
    @ApiResponse({ status: 200, description: 'BookedTime successfully got.' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Get("/get/bookedTime")
    async getBookedTime(@Query() dto: getBookedTime){
        if(isNumber(Number(dto.doctor_id))){

            return await this.appointmentsService.getAllBookedTimeOnDate(dto)
        }
    }
}
