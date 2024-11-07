import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ServicesModel } from "./services.model";
import { ServicesDto } from "./dto/services.dto";

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

    async getAllServices() {
        try {
            return await this.servicesRepository.findAll();
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

    async deleteService(service_id: number) {
        try {
            return await this.servicesRepository.destroy({ where: { id: service_id } });
        } catch (e) {
            throw new HttpException({ message: e }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
