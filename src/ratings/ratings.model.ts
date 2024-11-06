import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table, BelongsTo } from "sequelize-typescript";
import { DoctorModel } from "src/doctors/doctors.model";
import { PatientModel } from "src/patients/patients.model";

interface RatingInterface {
    id: number;
    doctor_id: number;
    patient_id: number;
    rating: number;
}

@Table({ tableName: 'ratings', createdAt: true, updatedAt: true })
export class RatingModel extends Model<RatingModel, RatingInterface> {

    @ApiProperty({ example: 1, description: "Unique Rating id." })
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 1, description: "ID of the doctor being rated." })
    @ForeignKey(() => DoctorModel)
    @Column({type: DataType.INTEGER, allowNull: false })
    doctor_id: number;

    @ApiProperty({ example: 1, description: "ID of the patient giving the rating." })
    @ForeignKey(() => PatientModel)
    @Column({type: DataType.INTEGER, allowNull: false })
    patient_id: number;

    @ApiProperty({ example: 4.5, description: "Rating given by the patient, between 0 and 5." })
    @Column({type: DataType.FLOAT, allowNull: false, validate: { min: 0, max: 5 } })
    rating: number;

    @BelongsTo(() => DoctorModel)
    doctor: DoctorModel;

    @BelongsTo(() => PatientModel)
    patient: PatientModel;
}
