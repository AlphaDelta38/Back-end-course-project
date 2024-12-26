import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {DoctorsModel} from "../doctors/doctors.model";


interface SpecialityInterface {
    id: number;
    name: string;
}

@Table({ tableName: 'speciality', createdAt: false, updatedAt: false })
export class SpecialityModel extends Model<SpecialityModel, SpecialityInterface>{
    @ApiProperty({ example: 1, description: 'Unique speciality ID.' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: "Surgeon", description: 'Speciality naming' })
    @Column({ type: DataType.STRING, unique: true, allowNull:false})
    name: string;

    @HasMany(() => DoctorsModel, { foreignKey: 'speciality_id' })
    doctors: DoctorsModel[]
}