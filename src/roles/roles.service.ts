import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RolesModel } from "./roles.model";
import { RolesDto } from "./dto/roles.dto";
import { SetDoctorsRoles } from "./dto/set-doctors-roles.dto";
import { DoctorsModel } from "../doctors/doctors.model";
import { DoctorsService } from "../doctors/doctors.service";

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

            if(!role && id !== 0){
                throw new HttpException({message: "User not found"}, HttpStatus.BAD_REQUEST)
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

    async setDoctorsRole(dto: SetDoctorsRoles){
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
            await doctors.$add("roles", role.id)
            await doctors.save()
        }catch (e){
            throw new HttpException({message: e}, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
