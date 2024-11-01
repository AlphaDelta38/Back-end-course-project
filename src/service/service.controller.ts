import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post} from '@nestjs/common';
import {ServiceService} from "./service.service";
import {ServiceDto} from "./dto/service.dto";
import {ApiBody, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {isNumber} from "@nestjs/common/utils/shared.utils";

@Controller('service')
export class ServiceController {


    constructor(private serviceServices: ServiceService) {
    }



    @ApiOperation({ summary: 'Create a new service' })
    @ApiResponse({ status: 201, description: 'Service successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Post()
    @ApiBody({ type: ServiceDto })
    async create(@Body() dto: ServiceDto){
        try {
            if(!dto.service){
                throw new HttpException({message: "name of service has not been got"}, HttpStatus.BAD_REQUEST);
            }
            return await this.serviceServices.createService(dto);
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'get all of services' })
    @ApiResponse({ status: 200, description: 'Services successfully got' })
    @ApiResponse({ status: 500, description: 'internal service error' })
    @Get()
    async getAll(){
        try {
            return await this.serviceServices.getAllServices();
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({ summary: "get one of services" })
    @ApiResponse({ status: 200, description: 'Service successfully got' })
    @ApiResponse({ status: 500, description: 'internal service error' })
    @Get("/:id")
    async getOne(@Param("id") service_id:number){
        try {
            if(!isNumber(Number(service_id))){
                throw new HttpException({message: "id is  not number"}, HttpStatus.BAD_REQUEST);
            }
            return await this.serviceServices.getOneService(service_id)
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: "delete one of services" })
    @ApiResponse({ status: 200, description: 'Service successfully deleted' })
    @ApiResponse({ status: 500, description: 'internal service error' })
    @Delete("/:id")
    @ApiBody({ type: Number })
    async delete(@Param("id") service_id:number){
        try {
            if(!isNumber(Number(service_id))){
                throw new HttpException({message: "id is  not number"}, HttpStatus.BAD_REQUEST);
            }
            return await this.serviceServices.deleteService(service_id)
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.BAD_REQUEST);
        }
    }


}
