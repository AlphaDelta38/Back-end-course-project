
import {BelongsTo, BelongsToMany, Model} from "sequelize-typescript";
import {Column, DataType, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {ServiceModel} from "../service/service.model";
import {DiagnosesModel} from "../diagnoses/diagnoses.model";






interface appointmentsInterface{
    id:number
    patient_id: number
    doctor_id: number
    service_id: number
    diagnosis_id: number
    date: string
    status: boolean
}


@Table({tableName:'appointments', createdAt:true, updatedAt: false})
export class AppointmentsModel extends Model<AppointmentsModel, appointmentsInterface>{


    @ApiProperty({example: 1, description: " unique key of service"})
    @Column({type: DataType.INTEGER, unique: true , autoIncrement: true, primaryKey: true} )
    id:number

    @ApiProperty({example: 2, description: "patient id for this appointments"})
    @Column({type: DataType.INTEGER,  allowNull:false})
    patient_id: number

    @ApiProperty({example: 3, description: "doctor id whome this appointment will be set "})
    @Column({type: DataType.INTEGER,  allowNull:false})
    doctor_id: number

    @ApiProperty({example: 4, description: "service id for this appointments "})
    @Column({type: DataType.INTEGER, allowNull:false})
    service_id: number

    @ApiProperty({example: 2, description: "id of diagnosis which has been set "})
    @Column({type: DataType.INTEGER, allowNull:false})
    diagnosis_id: number

    @ApiProperty({example: "22-04-2022", description: "date of appointments"})
    @Column({type: DataType.STRING, allowNull:false})
    date: string

    @ApiProperty({example: false, description: "status of appointments true/false, has been or not"})
    @Column({type: DataType.BOOLEAN, allowNull:false})
    status: boolean



    @BelongsTo(()=>ServiceModel, {foreignKey:"service_id"})
    services: ServiceModel

    @BelongsTo(()=>DiagnosesModel, {foreignKey:"diagnosis_id"})
    diagnosis: DiagnosesModel





}
