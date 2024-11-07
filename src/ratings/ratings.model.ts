import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table, BelongsTo } from "sequelize-typescript";
import { DoctorsModel } from "src/doctors/doctors.model";
import { PatientsModel } from "src/patients/patients.model";

interface RatingsInterface {
    id: number;
    doctor_id: number;
    patient_id: number;
    rating: number;
}

@Table({ tableName: 'ratings', createdAt: true, updatedAt: true })
export class RatingsModel extends Model<RatingsModel, RatingsInterface> {

    @ApiProperty({ example: 1, description: 'Unique Rating id.' })
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 1, description: 'ID of the doctor being rated.' })
    @ForeignKey(() => DoctorsModel)
    @Column({type: DataType.INTEGER, allowNull: false })
    doctor_id: number;

    @ApiProperty({ example: 1, description: 'ID of the patient giving the rating.' })
    @ForeignKey(() => PatientsModel)
    @Column({type: DataType.INTEGER, allowNull: false })
    patient_id: number;

    @ApiProperty({ example: 4.5, description: 'Rating given by the patient, between 0 and 5.' })
    @Column({type: DataType.FLOAT, allowNull: false, validate: { min: 0, max: 5 } })
    rating: number;

    @BelongsTo(() => DoctorsModel)
    doctor: DoctorsModel;

    @BelongsTo(() => PatientsModel)
    patient: PatientsModel;
}
