import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { isNumber } from "@nestjs/common/utils/shared.utils";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { PatientsService } from "./patients.service";
import { CreatePatientsDto } from "./dto/create-patients.dto";
import { PatientsDto } from "./dto/patients.dto";
import { Roles } from "../roles/roles.decorator";
import { RolesGuard } from "../roles/roles.guard";

@ApiTags('Patients')
@Controller('patients')
export class PatientsController {

    constructor(private patientsService: PatientsService) {}

    @ApiOperation({ summary: 'Create a new patient' })
    @ApiResponse({ status: 201, description: 'Patient created successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    @Post()
    @ApiBody({ type: CreatePatientsDto })
    async create(@Body() dto: CreatePatientsDto) {
        try {
            if (!dto.first_name || !dto.last_name || !dto.date_of_birth || !dto.gender || !dto.email || !dto.password) {
                throw new HttpException({ message: 'Required fields: first_name, last_name, date_of_birth, gender, email, password.' }, HttpStatus.BAD_REQUEST);
            }
            return await this.patientsService.createPatient(dto);
        } catch (e) {
            throw new HttpException({ message: e.message || 'Failed to create patient.' }, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'Retrieve all patients' })
    @ApiResponse({ status: 200, description: 'Patients retrieved successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    @Roles("doctor")
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll() {
        try {
            return await this.patientsService.getAllPatients();
        } catch (e) {
            throw new HttpException({ message: e.message || 'Failed to retrieve patients.' }, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'Retrieve a specific patient by ID' })
    @ApiResponse({ status: 200, description: 'Patient retrieved successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid ID or request.' })
    @Get('/:id')
    async getOne(@Param('id') id: number) {
        try {
            if (!isNumber(Number(id))) {
                throw new HttpException({ message: 'ID must be a number.' }, HttpStatus.BAD_REQUEST);
            }
            return await this.patientsService.getOnePatient(id);
        } catch (e) {
            throw new HttpException({ message: e.message || 'Failed to retrieve patient.' }, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'Delete a patient by ID' })
    @ApiResponse({ status: 200, description: 'Patient deleted successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid ID or request.' })
    @Delete('/:id')
    async delete(@Param('id') id: number) {
        try {
            if (!isNumber(Number(id))) {
                throw new HttpException({ message: 'ID must be a number.' }, HttpStatus.BAD_REQUEST);
            }
            return await this.patientsService.deletePatient(id);
        } catch (e) {
            throw new HttpException({ message: e.message || 'Failed to delete patient.' }, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'Update patient details' })
    @ApiResponse({ status: 200, description: 'Patient updated successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    @Put()
    @ApiBody({ type: PatientsDto })
    async update(@Body() dto: PatientsDto) {
        try {
            if (!dto.id) {
                throw new HttpException({ message: 'ID is required for update.' }, HttpStatus.BAD_REQUEST);
            }
            return await this.patientsService.updatePatient(dto);
        } catch (e) {
            throw new HttpException({ message: e.message || 'Failed to update patient.' }, HttpStatus.BAD_REQUEST);
        }
    }
}
