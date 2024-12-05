import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { isNumber } from "@nestjs/common/utils/shared.utils";
import { NewsService } from "./news.service";
import { CreateNewsDto } from "./dto/create-news.dto";
import {NewsDto, params} from "./dto/news.dto";

@ApiTags('News')
@Controller('news')
export class NewsController {

    constructor(private newsService: NewsService) {}

    @ApiOperation({ summary: 'Create a news article' })
    @ApiResponse({ status: 201, description: 'News article created successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    @Post()
    @ApiBody({ type: CreateNewsDto })
    async create(@Body() dto: CreateNewsDto) {
        try {
            if (!dto.title || !dto.text) {
                throw new HttpException({ message: 'Title and text are required.' }, HttpStatus.BAD_REQUEST);
            }
            return await this.newsService.createNews(dto);
        } catch (e) {
            throw new HttpException({ message: e.message || 'Failed to create news.' }, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'Retrieve all news articles' })
    @ApiResponse({ status: 200, description: 'News articles retrieved successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    @Get()
    async getAll(@Query() params: params) {
        try {
            return await this.newsService.getAllNews(params);
        } catch (e) {
            throw new HttpException({ message: e.message || 'Failed to retrieve news.' }, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'Retrieve a specific news article by ID' })
    @ApiResponse({ status: 200, description: 'News article retrieved successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid ID or request.' })
    @Get('/:id')
    async getOne(@Param('id') id: number) {
        try {
            if (!isNumber(Number(id))) {
                throw new HttpException({ message: 'ID must be a number.' }, HttpStatus.BAD_REQUEST);
            }
            return await this.newsService.getOneNews(id);
        } catch (e) {
            throw new HttpException({ message: e.message || 'Failed to retrieve news.' }, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'Delete a news article by ID' })
    @ApiResponse({ status: 200, description: 'News article deleted successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid ID or request.' })
    @Delete('/:id')
    async delete(@Param('id') id: number) {
        try {
            if (!isNumber(Number(id))) {
                throw new HttpException({ message: 'ID must be a number.' }, HttpStatus.BAD_REQUEST);
            }
            return await this.newsService.deleteNews(id);
        } catch (e) {
            throw new HttpException({ message: e.message || 'Failed to delete news.' }, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'Update a news article' })
    @ApiResponse({ status: 200, description: 'News article updated successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    @Put()
    @ApiBody({ type: NewsDto })
    async update(@Body() dto: NewsDto) {
        try {
            if (!dto.id) {
                throw new HttpException({ message: 'ID is required for update.' }, HttpStatus.BAD_REQUEST);
            }
            return await this.newsService.updateNews(dto);
        } catch (e) {
            throw new HttpException({ message: e.message || 'Failed to update news.' }, HttpStatus.BAD_REQUEST);
        }
    }
}
