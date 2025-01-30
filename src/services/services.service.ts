import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ServicesModel } from "./services.model";
import {getAllServicesParams, ServicesDto} from "./dto/services.dto";
import {UpdateServicesDto} from "./dto/update-services.dto";

@Injectable()
export class ServicesService {
    
    constructor(@InjectModel(ServicesModel) private servicesRepository: typeof ServicesModel) {}

    async createService(dto: ServicesDto) {
        try {
            return await this.servicesRepository.create(dto);
        } catch (e) {
            throw new HttpException({ message: e }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllServices(dto: getAllServicesParams) {
        try {
            if(dto.limit){
                return await this.servicesRepository.findAll({
                    limit: dto.limit,
                    offset: ((dto.page-1) || 0) * dto.limit,
                });
            }else{
                return await this.servicesRepository.findAll();
            }
        } catch (e) {
            throw new HttpException({ message: e }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOneService(service_id: number) {
        try {
            const service = await this.servicesRepository.findByPk(service_id);
            if (!service) {
                throw new HttpException({ message: 'Service not found.' }, HttpStatus.BAD_REQUEST);
            }
            return service;
        } catch (e) {
            throw new HttpException({ message: e }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async updateService(dto: UpdateServicesDto ) {
        try {
            return await this.servicesRepository.update(dto, {where: {id: dto.id}});
        } catch (e) {
            throw new HttpException({ message: e }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteService(service_id: number) {
        try {
            return await this.servicesRepository.destroy({ where: { id: service_id } });
        } catch (e) {
            throw new HttpException({ message: e }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async getAmount() {
        try {
            const services = await this.servicesRepository.findAll()
            if(!services){
                return 0
            }
            return  services.length
        } catch (e) {
            throw new HttpException({ message: e }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
