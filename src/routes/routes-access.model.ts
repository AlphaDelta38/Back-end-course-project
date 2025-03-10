import { ApiProperty } from "@nestjs/swagger";
import {BelongsTo, BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {RolesModel} from "../roles/roles.model";

interface RoutesAccessInterface{
    role_id: number
    route: string[]
}

@Table({ tableName: 'route-access', createdAt: false, updatedAt: false })
export class RoutesAccessModel extends Model<RoutesAccessModel, RoutesAccessInterface> {

    @ApiProperty({ example: '1', description: 'id of role' })
    @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true  })
    role_id: number;

    @ApiProperty({ example: '/get/amount', description: 'route of this API endpoints' })
    @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
    routes: string[];

    @BelongsTo(()=>RolesModel, {foreignKey: "role_id"})
    accessRoles: RolesModel

}