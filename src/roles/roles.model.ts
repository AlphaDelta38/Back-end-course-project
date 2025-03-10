import { ApiProperty } from "@nestjs/swagger";
import {Column, DataType, Table, BelongsToMany, Model, BelongsTo, HasMany, HasOne} from "sequelize-typescript";
import { DoctorsModel } from "../doctors/doctors.model";
import { DoctorsRolesModel } from "./doctors-roles.model";
import {RoutesAccessModel} from "../routes/routes-access.model";

interface RolesInterface {
    id: number;
    role: string;
}

@Table({ tableName: 'roles', createdAt: false, updatedAt: false })
export class RolesModel extends Model<RolesModel, RolesInterface> {

    @ApiProperty({ example: 1, description: 'Unique Role ID' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'admin / urologist', description: 'Doctor\'s role' })
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    role: string;

    @BelongsToMany(() => DoctorsModel, () => DoctorsRolesModel)
    doctors: DoctorsModel[];

    @HasOne(() => RoutesAccessModel, { foreignKey: "role_id" })
    routeAccess: RoutesAccessModel;
}
