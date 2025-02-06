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
} from '@nestjs/common';
import {SpecialityService} from "./speciality.service";
import {getAllSpecialityParams, specialityDto} from "./dto/speciality.dto";
import {ApiBody, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {specialityUpdateDto} from "./dto/specialityUpdate.dto";
import {Roles} from "../roles/roles.decorator";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../roles/roles.guard";

@Controller('speciality')
export class SpecialityController {

    constructor(private specialityService: SpecialityService) {
    }


    @ApiOperation({ summary: 'Create a new speciality for doctors' })
    @ApiResponse({ status: 201, description: 'Speciality created successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    @ApiBody({type: specialityDto})
    @Roles("POST /speciality")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async create(@Body() dto: specialityDto){
        if(!dto.name){
            throw new HttpException({message: "bad request, required fields not found "}, HttpStatus.BAD_REQUEST)
        }
        return await this.specialityService.createSpeciality(dto)
    }


    @ApiOperation({ summary: 'getAll of exist speciality for doctors' })
    @ApiResponse({ status: 201, description: 'Specialities got successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    @Get("/get/amount")
    async getAmount(){
        return await this.specialityService.getSpecialityAmount()
    }

    @ApiOperation({ summary: 'getAll of exist speciality for doctors' })
    @ApiResponse({ status: 201, description: 'Specialities got successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    @Get()
    async getAll(@Query() dto: getAllSpecialityParams){
        return await this.specialityService.getAllSpeciality(dto)
    }

    @ApiOperation({ summary: 'getOne of  exist speciality for doctors' })
    @ApiResponse({ status: 201, description: 'Speciality got successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    @Get("/:id")
    async getOne(@Param("id") id:number){
        if(Number(id) === undefined){
            throw new HttpException({message: "id not number or not found "}, HttpStatus.BAD_REQUEST)
        }
        return await this.specialityService.getOneSpecialty(id)
    }

    @ApiOperation({ summary: 'Update exist speciality for doctors' })
    @ApiResponse({ status: 201, description: 'Speciality updated successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    @ApiBody({type: specialityDto})
    @Roles("PUT /speciality")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put()
    async update(@Body() dto: specialityUpdateDto){
        if(!dto.name){
            throw new HttpException({message: "bad request, required fields not found "}, HttpStatus.BAD_REQUEST)
        }
        return await this.specialityService.updateSpecialty(dto)
    }

    @ApiOperation({ summary: 'Delete exist speciality for doctors' })
    @ApiResponse({ status: 201, description: 'Speciality deleted successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    @ApiBody({type: specialityDto})
    @Roles("DELETE /speciality/:id")
    @Delete("/:id")
    async delete(@Param("id") id:number){
        if(Number(id) === undefined){
            throw new HttpException({message: "id not number or not found "}, HttpStatus.BAD_REQUEST)
        }
        return await this.specialityService.deleteSpecialty(id)
    }




}
