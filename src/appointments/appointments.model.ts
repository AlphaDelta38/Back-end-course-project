import { BelongsTo, Model, Column, DataType, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { ServiceModel } from "../service/service.model";
import { DiagnosesModel } from "../diagnoses/diagnoses.model";
import {PatientModel} from "../patients/patients.model";

interface AppointmentsInterface {
    id: number;
    patient_id: number;
    doctor_id: number;
    service_id: number;
    diagnosis_id: number;
    date: string;
    status: boolean;
}

@Table({ tableName: 'appointments', createdAt: true, updatedAt: false })
export class AppointmentsModel extends Model<AppointmentsModel, AppointmentsInterface> {

    @ApiProperty({ example: 1, description: "Unique key of the appointment" })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 2, description: "Patient ID for this appointment" })
    @Column({ type: DataType.INTEGER, allowNull: false })
    patient_id: number;

    @ApiProperty({ example: 3, description: "Doctor ID for this appointment" })
    @Column({ type: DataType.INTEGER, allowNull: false })
    doctor_id: number;

    @ApiProperty({ example: 4, description: "Service ID associated with this appointment" })
    @Column({ type: DataType.INTEGER, allowNull: false })
    service_id: number;

    @ApiProperty({ example: 2, description: "Diagnosis ID associated with this appointment" })
    @Column({ type: DataType.INTEGER, allowNull: false })
    diagnosis_id: number;

    @ApiProperty({ example: "2022-04-22", description: "Date of the appointment" })
    @Column({ type: DataType.STRING, allowNull: false })
    date: string;

    @ApiProperty({ example: false, description: "Status of the appointment (true if attended, false otherwise)" })
    @Column({ type: DataType.BOOLEAN, allowNull: false })
    status: boolean;

    @BelongsTo(() => ServiceModel, { foreignKey: "service_id" })
    services: ServiceModel;

    @BelongsTo(() => DiagnosesModel, { foreignKey: "diagnosis_id" })
    diagnosis: DiagnosesModel;

    @BelongsTo(() => PatientModel, { foreignKey: "patient_id" })
    patient: PatientModel;

}
