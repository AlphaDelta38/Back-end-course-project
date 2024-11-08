import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RolesService } from "./roles.service";
import { RolesDto } from "./dto/roles.dto";
import { SetDoctorsRoles } from "./dto/set-doctors-roles.dto";

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    
    constructor(private rolesService: RolesService) {}

    @ApiOperation({ summary: 'Create a role' })
    @ApiResponse({ status: 201, description: 'Role created successfully' })
    @ApiResponse({ status: 400, description: 'Invalid request' })
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

    @ApiOperation({ summary: 'Get all roles' })
    @ApiResponse({ status: 200, description: 'Roles retrieved successfully' })
    @Get()
    async getAll() {
        try {
            return this.rolesService.getAllRoles();
        } catch (e) {
            throw new HttpException({ message: e.message || 'Failed to retrieve roles' }, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'Get role by ID' })
    @ApiResponse({ status: 200, description: 'Role retrieved successfully' })
    @Get('/:id')
    async getOne(@Param('id') id: number) {
        try {
            return this.rolesService.getOneRole(id);
        } catch (e) {
            throw new HttpException({ message: e.message || 'Failed to retrieve role' }, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'Delete role by ID' })
    @ApiResponse({ status: 200, description: 'Role deleted successfully' })
    @Delete('/:id')
    async delete(@Param('id') id: number) {
        try {
            return this.rolesService.deleteOneRole(id);
        } catch (e) {
            throw new HttpException({ message: e.message || 'Failed to delete role' }, HttpStatus.BAD_REQUEST);
        }
    }


    @ApiOperation({ summary: 'set roles for doctor' })
    @ApiResponse({ status: 200, description: 'Roles set successfully' })
    @Post('/set')
    async set(@Body() dto: SetDoctorsRoles) {
        try {
            if(dto.massiveId.length === 0 ){
                throw new HttpException({ message: "no one id not found" }, HttpStatus.BAD_REQUEST);
            }
            return this.rolesService.setDoctorsRole(dto);
        } catch (e) {
            throw new HttpException({ message: e.message || 'Failed to set roles' }, HttpStatus.BAD_REQUEST);
        }
    }
}
