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
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { isNumber } from "@nestjs/common/utils/shared.utils";
import { RatingsService } from "./ratings.service";
import { CreateRatingsDto } from "./dto/create-ratings.dto";
import { RatingsDto } from "./dto/ratings.dto";
import { GetRatingsDto } from "./dto/get-ratings.dto";
import {specialityDto} from "../speciality/dto/speciality.dto";
import {Roles} from "../roles/roles.decorator";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../roles/roles.guard";

@ApiTags('Ratings')
@Controller('ratings')
export class RatingsController {

    constructor(private ratingsService: RatingsService) {}

    @ApiOperation({ summary: 'Create a new rating' })
    @ApiResponse({ status: 201, description: 'The rating has been successfully created.' })
    @ApiResponse({ status: 400, description: 'The request is invalid or missing required fields.' })
    @ApiBody({type: specialityDto})
    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiBody({ type: CreateRatingsDto, description: 'Data for creating a new rating, including doctor and patient IDs, and rating score.' })
    async create(@Body() dto: CreateRatingsDto, @Req() req ) {
        try {
            if (!dto.doctor_id || !dto.patient_id || dto.rating === undefined) {
                throw new HttpException({ message: 'doctor_id, patient_id, and rating are required fields.' }, HttpStatus.BAD_REQUEST);
            }
            return await this.ratingsService.createRating(dto, req.user.id);
        } catch (e) {
            throw new HttpException({ message: e.message || 'Failed to create rating.' }, HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    @ApiOperation({ summary: 'Get all ratings for a specific doctor or patient' })
    @ApiResponse({ status: 200, description: 'Ratings successfully retrieved.' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiQuery({ name: 'type', required: false, description: 'Type of entity (doctor or patient)' })
    @ApiQuery({ name: 'id', required: false, description: 'ID of the entity' })
    async getAll(@Query() dto: GetRatingsDto) {
        if (dto.type && !dto.id) {
            throw new HttpException({ message: 'ID is required when type is specified.' }, HttpStatus.BAD_REQUEST);
        } else if (!dto.type && dto.id) {
            throw new HttpException({ message: 'Type of entity is required when ID is specified.' }, HttpStatus.BAD_REQUEST);
        }
        return await this.ratingsService.getAllRatings(dto);
    }


    @ApiOperation({ summary: 'Get amount of  ratings' })
    @ApiResponse({ status: 200, description: 'Amount of Rating successfully retrieved.' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Get("/get/amount")
    async getAmount() {
        return await this.ratingsService.getAmountOfRatings();
    }

    @ApiOperation({ summary: 'Retrieve a rating by ID' })
    @ApiResponse({ status: 200, description: 'The requested rating retrieved successfully.' })
    @ApiResponse({ status: 400, description: 'The ID is invalid or does not exist.' })
    @Get('/:id')
    async getOne(@Param('id') id: number) {
        try {
            if (!isNumber(Number(id))) {
                throw new HttpException({ message: 'ID must be a number.' }, HttpStatus.BAD_REQUEST);
            }
            return await this.ratingsService.getOneRating(id);
        } catch (e) {
            throw new HttpException({ message: e.message || 'Failed to retrieve rating.' }, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'Delete a rating by ID' })
    @ApiResponse({ status: 200, description: 'The rating has been deleted successfully.' })
    @ApiResponse({ status: 400, description: 'The ID is invalid or the request cannot be processed.' })
    @Roles("DELETE /ratings/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('/:id')
    async delete(@Param('id') id: number) {
        try {
            if (!isNumber(Number(id))) {
                throw new HttpException({ message: 'ID must be a number.' }, HttpStatus.BAD_REQUEST);
            }
            return await this.ratingsService.deleteRating(id);
        } catch (e) {
            throw new HttpException({ message: e.message || 'Failed to delete rating.' }, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'Update an existing rating' })
    @ApiResponse({ status: 200, description: 'The rating has been updated successfully.' })
    @ApiResponse({ status: 400, description: 'The update request is invalid or missing required fields.' })
    @Roles("PUT /ratings")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put()
    @ApiBody({ type: RatingsDto, description: 'Data for updating an existing rating, including the rating ID and updated information.' })
    async update(@Body() dto: RatingsDto) {
        try {
            if (!dto.id) {
                throw new HttpException({ message: 'ID is required for update.' }, HttpStatus.BAD_REQUEST);
            }
            return await this.ratingsService.updateRating(dto);
        } catch (e) {
            throw new HttpException({ message: e.message || 'Failed to update rating.' }, HttpStatus.BAD_REQUEST);
        }
    }
}
