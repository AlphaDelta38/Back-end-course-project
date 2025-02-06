import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RolesModel } from "./roles.model";
import {RolesDto, RolesParamsDto} from "./dto/roles.dto";
import { SetDoctorsRoles } from "./dto/set-doctors-roles.dto";
import { DoctorsService } from "../doctors/doctors.service";
import {UpdateRoleDto} from "./dto/update-role.dto";

@Injectable()
export class RolesService {

    constructor(
        @InjectModel(RolesModel) private  rolesRepository: typeof RolesModel,
        @Inject(forwardRef(() => DoctorsService)) private doctorsService: DoctorsService,
    ){}

    async createRole(dto: RolesDto){
        try {
            return await this.rolesRepository.create(dto)
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAllRoles(dto?: RolesParamsDto){
        try {
            if(dto.all === "true"){
                return await this.rolesRepository.findAll({include: {all: true}});
            }else if(dto.limit){
                return await this.rolesRepository.findAll({
                    limit: dto.limit,
                    offset: ((dto.page-1) || 0) * dto.limit
                })
            }else{
                return await this.rolesRepository.findAll()
            }
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getOneRole(id:number, roleName?: string){
        try {
            let role: RolesModel;
            if(roleName){
                role = await this.rolesRepository.findOne({where: {role: roleName}})
            }else{
                role = await this.rolesRepository.findByPk(id)
            }

            if(!role && id !== 0){
                throw new HttpException({message: 'User not found'}, HttpStatus.BAD_REQUEST)
            }

            return role;
        }catch (e){
             throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateRole(dto: UpdateRoleDto){
        try {
            const role = await this.rolesRepository.findByPk(Number(dto.id))
            if(role.role === "admin"){
                throw new HttpException({message: 'that role cant be updated'}, HttpStatus.BAD_REQUEST)
            }

            return await this.rolesRepository.update( {role: dto.role}, {where: {id: Number(dto.id)},})
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteOneRole(id: number){
        try {

            const role = await this.rolesRepository.findByPk(Number(id))
            if(role.role === "admin"){
                throw new HttpException({message: 'that role cant be deleted'}, HttpStatus.BAD_REQUEST)
            }

            return await this.rolesRepository.destroy({where: {id: id}})
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async setDoctorsRoles(dto: SetDoctorsRoles){
        try {
            for (const number of dto.massiveId) {
                await this.setRole(number, dto.doctor_id)
            }
            return 1
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    async setRole(roleId: number, doctorId: number){
        try {
            const doctors = await this.doctorsService.getOneDoctor(doctorId)
            const role = await this.getOneRole(roleId)
            await doctors.$add('roles', role.id)
            await doctors.save()
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAmountOfRoles(){
        try {
            const response = await this.rolesRepository.findAll()
            if(!response){
                return 0
            }
            return response.length
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


}
