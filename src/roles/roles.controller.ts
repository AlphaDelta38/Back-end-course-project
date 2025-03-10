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
import { RolesService } from "./roles.service";
import {RolesDto, RolesParamsDto} from "./dto/roles.dto";
import { SetDoctorsRoles } from "./dto/set-doctors-roles.dto";
import {UpdateRoleDto} from "./dto/update-role.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "./roles.decorator";
import {RolesGuard} from "./roles.guard";

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    
    constructor(private rolesService: RolesService) {}

    @ApiOperation({ summary: 'Create a role' })
    @ApiResponse({ status: 201, description: 'Role created successfully' })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    @Roles("POST /roles")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @ApiBody({ type: RolesDto })
    async create(@Body() dto: RolesDto) {
        if (!dto.role) {
            throw new HttpException({ message: 'Required fields: role' }, HttpStatus.BAD_REQUEST);
        }
        try {
            return this.rolesService.createRole(dto);
        } catch (e) {
            throw new HttpException({ message: e.message || 'Role creation failed' }, HttpStatus.BAD_REQUEST);
        }
    }


    @ApiOperation({ summary: 'Get Amount of roles' })
    @ApiResponse({ status: 200, description: 'Amount retrieved successfully' })
    @Roles("GET /roles/get/amount")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get("/get/amount")
    async getAmount() {
        try {
            return this.rolesService.getAmountOfRoles();
        } catch (e) {
            throw new HttpException({ message: e.message || 'Failed to retrieve Amount' }, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'Get all roles' })
    @ApiResponse({ status: 200, description: 'Roles retrieved successfully' })
    @Get()
    @Roles("GET /roles")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getAll(@Query() dto: RolesParamsDto) {
        try {
            return this.rolesService.getAllRoles(dto);
        } catch (e) {
            throw new HttpException({ message: e.message || 'Failed to retrieve roles' }, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'Get role by ID' })
    @ApiResponse({ status: 200, description: 'Role retrieved successfully' })
    @Roles("GET /roles/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/:id')
    async getOne(@Param('id') id: number) {
        try {
            return this.rolesService.getOneRole(id);
        } catch (e) {
            throw new HttpException({ message: e.message || 'Failed to retrieve role' }, HttpStatus.BAD_REQUEST);
        }
    }


    @ApiOperation({ summary: 'Update role by ID' })
    @ApiResponse({ status: 200, description: 'Role updated successfully' })
    @Roles("PUT /roles")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put()
    async update(@Body() dto: UpdateRoleDto) {
        try {
            return this.rolesService.updateRole(dto);
        } catch (e) {
            throw new HttpException({ message: e.message || 'Failed to delete role' }, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'Delete role by ID' })
    @ApiResponse({ status: 200, description: 'Role deleted successfully' })
    @Roles("DELETE /roles/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('/:id')
    async delete(@Param('id') id: number) {
        try {
            return this.rolesService.deleteOneRole(id);
        } catch (e) {
            throw new HttpException({ message: e.message || 'Failed to delete role' }, HttpStatus.BAD_REQUEST);
        }
    }


    @ApiOperation({ summary: 'Set roles for doctor' })
    @ApiResponse({ status: 200, description: 'Roles set successfully' })
    @Roles("POST /roles/set")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/set')
    async set(@Body() dto: SetDoctorsRoles) {
        try {
            if(dto.massiveId.length === 0 ){
                throw new HttpException({ message: 'No one id not found' }, HttpStatus.BAD_REQUEST);
            }
            return this.rolesService.setDoctorsRoles(dto);
        } catch (e) {
            throw new HttpException({ message: e.message || 'Failed to set roles' }, HttpStatus.BAD_REQUEST);
        }
    }
}
