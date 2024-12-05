import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { isNumber } from "@nestjs/common/utils/shared.utils";
import { DoctorsService } from "./doctors.service";
import { CreateDoctorsDto } from "./dto/create-doctor.dto";
import {DoctorsDto, getAllDoctorParams} from "./dto/doctor.dto";
import { SetDoctorsRolesDto} from "./dto/set-doctors-roles.dto";

@ApiTags('Doctors')
@Controller('doctors')
export class DoctorsController {

    constructor(private doctorsService: DoctorsService) {}

    @ApiOperation({ summary: 'Create a new doctor' })
    @ApiResponse({ status: 201, description: 'Doctor created successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    @Post()
    @ApiBody({ type: CreateDoctorsDto })
    async create(@Body() dto: CreateDoctorsDto) {
        try {
            if (!dto.first_name || !dto.last_name || !dto.date_of_birth || !dto.gender || !dto.email) {
                throw new HttpException({ message: "Required fields: first_name, last_name, date_of_birth, gender, email." }, HttpStatus.BAD_REQUEST);
            }
            return await this.doctorsService.createDoctor(dto);
        } catch (e) {
            throw new HttpException({ message: e.message || "Failed to create doctor." }, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'Retrieve all doctors' })
    @ApiResponse({ status: 200, description: 'Doctors retrieved successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    @Get()
    async getAll(@Query() params: getAllDoctorParams) {
        try {
            return await this.doctorsService.getAllDoctors(params);
        } catch (e) {
            throw new HttpException({ message: e.message || "Failed to retrieve doctors." }, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'Retrieve a specific doctor by ID' })
    @ApiResponse({ status: 200, description: 'Doctor retrieved successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid ID or request.' })
    @Get("/:id")
    async getOne(@Param('id') id: number) {
        try {
            if (!isNumber(Number(id))) {
                throw new HttpException({ message: "ID must be a number." }, HttpStatus.BAD_REQUEST);
            }
            return await this.doctorsService.getOneDoctor(id);
        } catch (e) {
            throw new HttpException({ message: e.message || "Failed to retrieve doctor." }, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'Delete a doctor by ID' })
    @ApiResponse({ status: 200, description: 'Doctor deleted successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid ID or request.' })
    @Delete("/:id")
    async delete(@Param('id') id: number) {
        try {
            if (!isNumber(Number(id))) {
                throw new HttpException({ message: "ID must be a number." }, HttpStatus.BAD_REQUEST);
            }
            return await this.doctorsService.deleteDoctor(id);
        } catch (e) {
            throw new HttpException({ message: e.message || "Failed to delete doctor." }, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'Update doctor details' })
    @ApiResponse({ status: 200, description: 'Doctor updated successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    @Put()
    @ApiBody({ type: DoctorsDto })
    async update(@Body() dto: DoctorsDto) {
        try {
            if (!dto.id) {
                throw new HttpException({ message: "ID is required for update." }, HttpStatus.BAD_REQUEST);
            }
            return await this.doctorsService.updateDoctor(dto);
        } catch (e) {
            throw new HttpException({ message: e.message || "Failed to update doctor." }, HttpStatus.BAD_REQUEST);
        }
    }


    @ApiOperation({ summary: 'set roles for  doctor ' })
    @ApiResponse({ status: 200, description: 'Doctor role successfully set.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    @Post("/roles")
    @ApiBody({ type: SetDoctorsRolesDto })
    async setDoctorRole(@Body() dto: SetDoctorsRolesDto) {
        try {
            if (!dto.doctor_id || dto.roles_id.length === 0) {
                throw new HttpException({ message: "roles id or doctor id not arrived" }, HttpStatus.BAD_REQUEST);
            }
            return await this.doctorsService.setDoctorRoles(dto);
        } catch (e) {
            throw new HttpException({ message: e.message || "Failed to update doctor." }, HttpStatus.BAD_REQUEST);
        }
    }

}
