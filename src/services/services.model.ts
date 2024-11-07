import { HasMany, Model, Column, DataType, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { AppointmentsModel } from "../appointments/appointments.model";

interface ServicesInterface {
    id: number;
    service: string;
}

@Table({ tableName: 'services', createdAt: false, updatedAt: false })
export class ServicesModel extends Model<ServicesModel, ServicesInterface> {

    @ApiProperty({ example: 1, description: 'Unique Service ID.' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({example: 'Blood test', description:'Service name.'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    service: string;

    @HasMany(() => AppointmentsModel, { foreignKey: 'service_id' })
    appointments: AppointmentsModel[];
}
