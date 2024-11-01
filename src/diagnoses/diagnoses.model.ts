
import {Model} from "sequelize-typescript";
import {Column, DataType, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";






interface diagnosesInterface{
    id:number,
    diagnosis: string
    notes?: string
    prescription: string
}


@Table({tableName:'diagnoses', createdAt:true, updatedAt: false})
export class DiagnosesModel extends Model<DiagnosesModel, diagnosesInterface>{


    @ApiProperty({example: 1, description: " unique key of service"})
    @Column({type: DataType.INTEGER, unique: true , autoIncrement: true, primaryKey: true} )
    id:number

    @ApiProperty({example: "Speed", description: "diagnoses of patients"})
    @Column({type: DataType.STRING,  allowNull:false})
    diagnosis: string

    @ApiProperty({example: "drink two tablet on day", description: "notes for treatments"})
    @Column({type: DataType.STRING,  allowNull:true})
    notes: string

    @ApiProperty({example: "Paracetamol, Ibuprophen", description: "destinations for treatments of diagnosis "})
    @Column({type: DataType.STRING, allowNull:false})
    prescription: string


}
