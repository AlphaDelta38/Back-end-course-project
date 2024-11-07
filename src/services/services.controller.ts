import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { isNumber } from "@nestjs/common/utils/shared.utils";
import { ServicesService } from "./services.service";
import { ServicesDto } from "./dto/services.dto";

@ApiTags('Services')
@Controller('services')
export class ServicesController {
    
    constructor(private servicesService: ServicesService) {}

    @ApiOperation({ summary: 'Create a new service' })
    @ApiResponse({ status: 201, description: 'Service successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad request: Missing service name.' })
    @Post()
    @ApiBody({ type: ServicesDto })
    async create(@Body() dto: ServicesDto) {
        if (!dto.service) {
            throw new HttpException({ message: 'Service name is required.' }, HttpStatus.BAD_REQUEST);
        }
        return await this.servicesService.createService(dto);
    }

    @ApiOperation({ summary: 'Retrieve all services' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved all services.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    @Get()
    async getAll() {
        return await this.servicesService.getAllServices();
    }

    @ApiOperation({ summary: 'Retrieve a specific service by ID' })
    @ApiResponse({ status: 200, description: 'Service successfully retrieved.' })
    @ApiResponse({ status: 400, description: 'Bad request: ID is not a number.' })
    @ApiResponse({ status: 404, description: 'Service not found.' })
    @Get('/:id')
    async getOne(@Param('id') service_id: number) {
        if (!isNumber(Number(service_id))) {
            throw new HttpException({ message: 'ID must be a number.' }, HttpStatus.BAD_REQUEST);
        }
        const service = await this.servicesService.getOneService(service_id);
        if (!service) {
            throw new HttpException({ message: 'Service not found.' }, HttpStatus.NOT_FOUND);
        }
        return service;
    }

    @ApiOperation({ summary: 'Delete a specific service by ID' })
    @ApiResponse({ status: 200, description: 'Service successfully deleted.' })
    @ApiResponse({ status: 400, description: 'Bad request: ID is not a number.' })
    @ApiResponse({ status: 404, description: 'Service not found.' })
    @Delete('/:id')
    async delete(@Param('id') service_id: number) {
        if (!isNumber(Number(service_id))) {
            throw new HttpException({ message: 'ID must be a number.' }, HttpStatus.BAD_REQUEST);
        }
        const result = await this.servicesService.deleteService(service_id);
        if (!result) {
            throw new HttpException({ message: 'Service not found.' }, HttpStatus.NOT_FOUND);
        }
        return { message: 'Service successfully deleted.' };
    }
}
