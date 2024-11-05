import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {RolesModel} from "./roles.model";
import {RolesDto} from "./dto/roles.dto";


@Injectable()
export class RolesService {

    constructor(@InjectModel(RolesModel) private  rolesRepository: typeof RolesModel) {
    }

    async createRole(dto: RolesDto){
        try {
            return await this.rolesRepository.create(dto)
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAllRoles(){
        try {
            return await this.rolesRepository.findAll()
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getOneRole(id:number, roleName?: string){
        try {
            let role: RolesModel;
            if(roleName){
                role = await this.rolesRepository.findOne({where: {role: roleName}})
                console.log(role)
            }else{
                role = await this.rolesRepository.findByPk(id)
            }
            if(!role && !roleName){
                throw new HttpException({message: "role not found"}, HttpStatus.BAD_REQUEST)
            }
            return role;
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteOneRole(id: number){
        try {
            return await this.rolesRepository.destroy({where: {id: id}})
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
