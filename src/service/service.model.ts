import {Model} from "sequelize-typescript";
import {Column, DataType, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";



interface serviceInterface{
    id:number,
    service: string,
}


@Table({tableName:'service', createdAt:false, updatedAt: false})
export class ServiceModel extends Model<ServiceModel, serviceInterface>{


    @ApiProperty({example: 1, description: " unique key of service"})
    @Column({type: DataType.INTEGER, unique: true , autoIncrement: true, primaryKey: true} )
    id:number

    @ApiProperty({example: "appointment of doctor", description: "name of action, or service name"})
    @Column({type: DataType.STRING, unique:true, allowNull: false})
    service: string


}
