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
    Query, Req,
    UseGuards
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { isNumber } from "@nestjs/common/utils/shared.utils";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { PatientsService } from "./patients.service";
import { CreatePatientsDto } from "./dto/create-patients.dto";
import { PatientsDto } from "./dto/patients.dto";
import { Roles } from "../roles/roles.decorator";
import { RolesGuard } from "../roles/roles.guard";
import {GetPatientsDto} from "./dto/get-patients.dto";
import {changePassword} from "./dto/change-password.dto";

@ApiTags('Patients')
@Controller('patients')
export class PatientsController {

    constructor(private patientsService: PatientsService) {}

    @ApiOperation({ summary: 'Create a new patient' })
    @ApiResponse({ status: 201, description: 'Patient created successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    @Roles("POST /patients")
    @UseGuards(JwtAuthGuard, RolesGuard)
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


    @ApiOperation({ summary: 'getting lenght of all patient'})
    @ApiResponse({ status: 200, description: 'Patients Amount got successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    @Get("/get/amount")
    async getAmount() {
        try {
            return await this.patientsService.getAmount();
        } catch (e) {
            throw new HttpException({ message: e.message || 'Failed to got Amount of patients.' }, HttpStatus.BAD_REQUEST);
        }
    }


    @ApiOperation({ summary: 'Retrieve all patients' })
    @ApiResponse({ status: 200, description: 'Patients retrieved successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    @Get()
    async getAll(@Query() dto: GetPatientsDto) {
        try {
            return await this.patientsService.getAllPatients(dto);
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
    @Roles("DELETE /patients/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
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
    @Roles("PUT /patients")
    @UseGuards(JwtAuthGuard, RolesGuard)
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


    @ApiOperation({ summary: 'Update patient details' })
    @ApiResponse({ status: 200, description: 'Patient updated successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    @UseGuards(JwtAuthGuard)
    @Put("/updateSelf")
    @ApiBody({ type: PatientsDto })
    async updatePatientByJWT(@Body() dto: Omit<PatientsDto, "id">, @Req() req) {
        try {
            return await this.patientsService.updateForSelf(dto, req.user.id);
        } catch (e) {
            throw new HttpException({ message: e.message || 'Failed to update patient.' }, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'password patient details' })
    @ApiResponse({ status: 200, description: 'password updated successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    @UseGuards(JwtAuthGuard)
    @Put("/updateSelf/password")
    @ApiBody({ type: changePassword })
    async updatePasswordSelf(@Body() dto: changePassword, @Req() req) {
        try {
            return await this.patientsService.changePasswordSelf(dto, req.user.id);
        } catch (e) {
            throw new HttpException({ message: e.message || 'Failed to update patient.' }, HttpStatus.BAD_REQUEST);
        }
    }

}
