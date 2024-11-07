import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model, ForeignKey } from "sequelize-typescript";
import { DoctorsModel } from "../doctors/doctors.model";
import { RolesModel } from "./roles.model";

interface DoctorsRolesInterface {
    doctor_id: number,
    role_id: number,
}

@Table({ tableName: 'doctors-roles', createdAt: false, updatedAt: false })
export class DoctorsRolesModel extends Model<DoctorsRolesModel, DoctorsRolesInterface> {

    @ApiProperty({ example: 1, description: 'Doctor\'s ID' })
    @ForeignKey(() => DoctorsModel)
    @Column({ type: DataType.INTEGER, allowNull: false })
    doctor_id: number;

    @ApiProperty({ example: 1, description: 'Role\'s ID' })
    @ForeignKey(() => RolesModel)
    @Column({ type: DataType.INTEGER, allowNull: false })
    role_id: number;

}
