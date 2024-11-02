import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { ServiceModel } from "./service.model";
import { ServiceDto } from "./dto/service.dto";

@Injectable()
export class ServiceService {
    
    constructor(@InjectModel(ServiceModel) private serviceRepository: typeof ServiceModel) {}

    async createService(dto: ServiceDto) {
        try {
            return await this.serviceRepository.create(dto);
        } catch (e) {
            throw new HttpException({ message: e }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllServices() {
        try {
            return await this.serviceRepository.findAll();
        } catch (e) {
            throw new HttpException({ message: e }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOneService(service_id: number) {
        try {
            const service = await this.serviceRepository.findByPk(service_id);
            if (!service) {
                throw new HttpException({ message: "Service not found." }, HttpStatus.BAD_REQUEST);
            }
            return service;
        } catch (e) {
            throw new HttpException({ message: e }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteService(service_id: number) {
        try {
            return await this.serviceRepository.destroy({ where: { id: service_id } });
        } catch (e) {
            throw new HttpException({ message: e }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
