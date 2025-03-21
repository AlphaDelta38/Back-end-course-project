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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { isNumber } from "@nestjs/common/utils/shared.utils";
import { DiagnosesService } from "./diagnoses.service";
import { CreateDiagnosesDto } from "./dto/create-diagnoses.dto";
import {DiagnosesDto, getAllDiagnosesParams} from "./dto/diagnoses.dto";
import {Roles} from "../roles/roles.decorator";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../roles/roles.guard";

@ApiTags('Diagnoses')
@Controller('diagnoses')
export class DiagnosesController {
    
    constructor(private diagnosesService: DiagnosesService) {}

    @ApiOperation({ summary: 'Create a new diagnosis' })
    @ApiResponse({ status: 201, description: 'Diagnosis successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    @Roles("POST /diagnoses")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @ApiBody({ type: CreateDiagnosesDto })
    async create(@Body() dto: CreateDiagnosesDto) {
        try {
            if (!dto.diagnosis) {
                throw new HttpException({ message: "Diagnosis and prescription are required." }, HttpStatus.BAD_REQUEST);
            }
            return await this.diagnosesService.createDiagnosis(dto);
        } catch (e) {
            throw new HttpException({ message: e.message || "Failed to create diagnosis." }, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'Get Amount diagnoses' })
    @ApiResponse({ status: 200, description: 'Diagnoses got successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    @Get("/get/amount")
    async getAmount() {
        try {
            return await this.diagnosesService.getAmount();
        } catch (e) {
            throw new HttpException({ message: e.message || "Failed to retrieve diagnoses." }, HttpStatus.BAD_REQUEST);
        }
    }



    @ApiOperation({ summary: 'Retrieve all diagnoses' })
    @ApiResponse({ status: 200, description: 'Diagnoses retrieved successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    @Get()
    async getAll(@Query() dto: getAllDiagnosesParams) {
        try {
            return await this.diagnosesService.getAllDiagnoses(dto);
        } catch (e) {
            throw new HttpException({ message: e.message || "Failed to retrieve diagnoses." }, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'Retrieve a specific diagnosis by ID' })
    @ApiResponse({ status: 200, description: 'Diagnosis retrieved successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid ID or request.' })
    @Get("/:id")
    async getOne(@Param('id') diagnosis_id: number) {
        try {
            if (!isNumber(diagnosis_id)) {
                throw new HttpException({ message: "ID must be a number." }, HttpStatus.BAD_REQUEST);
            }
            return await this.diagnosesService.getOneDiagnosis(diagnosis_id);
        } catch (e) {
            throw new HttpException({ message: e.message || "Failed to retrieve diagnosis." }, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'Delete a diagnosis by ID' })
    @ApiResponse({ status: 200, description: 'Diagnosis deleted successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid ID or request.' })
    @Roles("POST /diagnoses/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete("/:id")
    async delete(@Param('id') diagnosis_id: number) {
        try {
            if (!isNumber(Number(diagnosis_id))) {
                throw new HttpException({ message: "ID must be a number." }, HttpStatus.BAD_REQUEST);
            }
            return await this.diagnosesService.deleteDiagnosis(diagnosis_id);
        } catch (e) {
            throw new HttpException({ message: e.message || "Failed to delete diagnosis." }, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'Update an existing diagnosis' })
    @ApiResponse({ status: 200, description: 'Diagnosis updated successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    @Roles("PUT /diagnoses")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put()
    @ApiBody({ type: DiagnosesDto })
    async update(@Body() dto: DiagnosesDto) {
        try {
            if (!dto.id) {
                throw new HttpException({ message: "ID is required for updating the diagnosis." }, HttpStatus.BAD_REQUEST);
            }
            return await this.diagnosesService.updateDiagnosis(dto);
        } catch (e) {
            throw new HttpException({ message: e.message || "Failed to update diagnosis." }, HttpStatus.BAD_REQUEST);
        }
    }
}
