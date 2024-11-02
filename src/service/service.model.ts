import { ApiProperty } from "@nestjs/swagger";
import { AppointmentsModel } from "../appointments/appointments.model";
import { HasMany, Model, Column, DataType, Table } from "sequelize-typescript";

interface ServiceInterface {
    id: number;
    service: string;
}

@Table({ tableName: 'service', createdAt: false, updatedAt: false })
export class ServiceModel extends Model<ServiceModel, ServiceInterface> {

    @ApiProperty({ example: 1, description: "Unique identifier for the service" })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: "Doctor Appointment", description: "Name of the service or action" })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    service: string;

    @HasMany(() => AppointmentsModel, { foreignKey: "service_id" })
    appointments: AppointmentsModel[];
}
