
import { ApiProperty } from "@nestjs/swagger";
import {Column, DataType, Table, HasOne, Model, BelongsToMany, BelongsTo, ForeignKey} from "sequelize-typescript";
import {DoctorModel} from "../doctors/doctors.model";
import {RolesModel} from "./roles.model";

interface DoctorRolesInterface {
    doctor_id: number,
    role_id: number,
}

@Table({ tableName: 'doctor-roles', createdAt: false, updatedAt: false })
export class DoctorRolesModel extends Model<DoctorRolesModel, DoctorRolesInterface> {

    @ApiProperty({ example: 1, description: "id of doctor" })
    @ForeignKey(() => DoctorModel)
    @Column({ type: DataType.INTEGER, allowNull: false })
    doctor_id: number;

    @ApiProperty({ example: 1, description: "id of role" })
    @ForeignKey(() => RolesModel)
    @Column({ type: DataType.INTEGER, allowNull: false })
    role_id: number;


}
