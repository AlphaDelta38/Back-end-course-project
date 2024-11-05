
import { ApiProperty } from "@nestjs/swagger";
import { AppointmentsModel } from "../appointments/appointments.model";
import {Column, DataType, Table, HasOne, Model, BelongsToMany} from "sequelize-typescript";
import {DoctorModel} from "../doctors/doctors.model";
import {DoctorRolesModel} from "./doctor-role.model";

interface RolesInterface {
    id: number,
    role: string,
}

@Table({ tableName: 'roles', createdAt: false, updatedAt: false })
export class RolesModel extends Model<RolesModel, RolesInterface> {

    @ApiProperty({ example: 1, description: "Unique Diagnosis id." })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: "Admin / urologist", description: "role of Doctor" })
    @Column({ type: DataType.STRING, allowNull: false , unique: true})
    role: string;

    @BelongsToMany(()=>DoctorModel, ()=>DoctorRolesModel)
    doctors: DoctorModel[];

}
