import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {ApiBody, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {RolesDto} from "./dto/roles.dto";


@Controller('roles')
export class RolesController {
    constructor(private rolesService : RolesService) {
    }


    @ApiOperation({ summary: 'Create a new role' })
    @ApiResponse({ status: 201, description: 'role created successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    @Post()
    @ApiBody({ type: RolesDto })
    async create(@Body() dto: RolesDto) {
        try {
            if (!dto.role) {
                throw new HttpException({ message: "Required fields: role" }, HttpStatus.BAD_REQUEST);
            }
            return this.rolesService.createRole(dto)
        } catch (e) {
            throw new HttpException({ message: e.message || "Failed to create roles." }, HttpStatus.BAD_REQUEST);
        }
    }


    @ApiOperation({ summary: 'get all roles' })
    @ApiResponse({ status: 201, description: 'roles got successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    @Get()
    async getAll( ) {
        try {
            return this.rolesService.getAllRoles()
        } catch (e) {
            throw new HttpException({ message: e.message || "Failed to getting roles." }, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'get one role' })
    @ApiResponse({ status: 201, description: 'Role got successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    @Get("/:id")
    async getOne(@Param("id") id:number ) {
        try {
            return this.rolesService.getOneRole(id);
        } catch (e) {
            throw new HttpException({ message: e.message || "Failed to getting role." }, HttpStatus.BAD_REQUEST);
        }
    }


    @ApiOperation({ summary: 'Delete one role' })
    @ApiResponse({ status: 201, description: 'role deleted successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid request.' })
    @Delete ("/:id")
    async delete(@Param("id") id:number ) {
        try {
            return this.rolesService.deleteOneRole(id);
        } catch (e) {
            throw new HttpException({ message: e.message || "Failed to delete the role." }, HttpStatus.BAD_REQUEST);
        }
    }



}
