import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {DiagnosesService} from "./diagnoses.service";
import {ApiBody, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {DiagnosesDto} from "./dto/diagnoses.dto";
import {isNumber} from "@nestjs/common/utils/shared.utils";

@Controller('diagnoses')
export class DiagnosesController {

    constructor(private diagnosesService: DiagnosesService) {
    }


    @ApiOperation({ summary: 'Create a new diagnoses' })
    @ApiResponse({ status: 201, description: 'Diagnosis successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Post()
    @ApiBody({ type: DiagnosesDto })
    async create(@Body() dto: DiagnosesDto){
        try {
            if(!dto.diagnosis || !dto.prescription){
                throw new HttpException({message: "diagnosis or prescription has not got"}, HttpStatus.BAD_REQUEST)
            }
            return await this.diagnosesService.createDiagnosis(dto)
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.BAD_REQUEST)
        }
    }


    @ApiOperation({ summary: 'get all of diagnoses' })
    @ApiResponse({ status: 201, description: 'Diagnoses successfully got' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Get()
    async getAll(){
        try {
            return await this.diagnosesService.getAllDiagnoses()
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.BAD_REQUEST)
        }
    }


    @ApiOperation({ summary: 'get one of diagnoses' })
    @ApiResponse({ status: 201, description: 'Diagnosis successfully got' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Get("/:id")
    @ApiBody({ type: Number })
    async getOne(@Param('id') diagnosis_id: number){
        try {
            if(!isNumber(Number(diagnosis_id))){
                throw new HttpException({message: "id not number"}, HttpStatus.BAD_REQUEST)
            }
            return await this.diagnosesService.getOneDiagnosis(diagnosis_id)
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.BAD_REQUEST)
        }
    }

    @ApiOperation({ summary: 'delete one of diagnoses' })
    @ApiResponse({ status: 201, description: 'Diagnosss successfully deleted' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Delete("/:id")
    @ApiBody({ type: Number })
    async delete(@Param('id') diagnosis_id: number){
        try {
            if(!isNumber(Number(diagnosis_id))){
                throw new HttpException({message: "id not number"}, HttpStatus.BAD_REQUEST)
            }
            return await this.diagnosesService.deleteDiagnosis(diagnosis_id)
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.BAD_REQUEST)
        }
    }

    @ApiOperation({ summary: 'update one of diangosis' })
    @ApiResponse({ status: 201, description: 'Diagnosss successfully updated' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Put()
    @ApiBody({ type: Number })
    async update(@Body() dto: DiagnosesDto){
        try {
            if(!dto.id){
                throw new HttpException({message: "id has not got for update"}, HttpStatus.BAD_REQUEST)
            }
            return await this.diagnosesService.updateDiagnosis(dto)
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.BAD_REQUEST)
        }
    }



}
