
import {Body, Controller, Get, HttpException, HttpStatus, Param, Post, Request, UseGuards} from "@nestjs/common";
import { Request as ExpressRequest, Router } from "express";
import {RoutesService} from "./routes.service";
import {isNumber} from "@nestjs/common/utils/shared.utils";
import {CreateAccessDto} from "./dto/create-Access.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Roles} from "../roles/roles.decorator";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../roles/roles.guard";


@Controller('routes')
export class RoutesController {

    constructor(private routesService: RoutesService) {
    }


    @ApiOperation({ summary: 'Create / update  access  for roles' })
    @ApiResponse({ status: 201, description: 'access created successfully' })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    @Roles("POST /routes")
    @Post()
    async create(@Body() dto: CreateAccessDto) {
        if(!isNumber(Number(dto.role_id))){
            throw new HttpException({message:"Id must be a number"}, HttpStatus.BAD_REQUEST)
        }
        return this.routesService.createRolesAccess(dto)
    }

    @ApiOperation({ summary: ' get all path of endpoints the server ' })
    @ApiResponse({ status: 201, description: 'endpoints got successfully' })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    @Roles("GET /routes")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    root(@Request() req: ExpressRequest) {
        const router = req.app._router as Router;
        return {
            routes: router.stack
                .map(layer => {
                    if(layer.route) {
                        const path = layer.route?.path;
                        const method = layer.route?.stack[0].method;
                        return `${method.toUpperCase()} ${path}`
                    }
                })
                .filter(item => item !== undefined && !item.includes("/api") && !item.includes("/auth") )
        }
    }

    @ApiOperation({ summary: 'get access info of one role' })
    @ApiResponse({ status: 201, description: 'info got successfully' })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    @Roles("GET /routes/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get("/:id")
    async getOne(@Param("id") id:number) {
        if(!isNumber(Number(id))){
            throw new HttpException({message:"Id must be a number"}, HttpStatus.BAD_REQUEST)
        }
        return this.routesService.getOneById(id)
    }



}
