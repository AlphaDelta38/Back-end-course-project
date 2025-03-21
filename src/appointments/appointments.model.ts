import { BelongsTo, Model, Column, DataType, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { ServicesModel } from "../services/services.model";
import { DiagnosesModel } from "../diagnoses/diagnoses.model";
import { PatientsModel } from "../patients/patients.model";
import { DoctorsModel } from "../doctors/doctors.model";

interface AppointmentsInterface {
    id: number;
    patient_id: number;
    doctor_id: number;
    service_id: number;
    diagnosis_id: number;
    date: string;
    time: string;
    status: boolean;
    notes?: string;
    prescription: string;
}

@Table({ tableName: 'appointments', createdAt: true, updatedAt: false })
export class AppointmentsModel extends Model<AppointmentsModel, AppointmentsInterface> {

    @ApiProperty({ example: 1, description: 'Unique key of the appointment' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 2, description: 'Patient ID for this appointment' })
    @Column({ type: DataType.INTEGER, allowNull: false })
    patient_id: number;

    @ApiProperty({ example: 3, description: 'Doctor ID for this appointment' })
    @Column({ type: DataType.INTEGER, allowNull: false })
    doctor_id: number;

    @ApiProperty({ example: 4, description: 'Service ID associated with this appointment' })
    @Column({ type: DataType.INTEGER, allowNull: false })
    service_id: number;

    @ApiProperty({ example: 2, description: 'Diagnosis ID associated with this appointment' })
    @Column({ type: DataType.INTEGER, allowNull: true })
    diagnosis_id: number;

    @ApiProperty({ example: '2022-04-22', description: 'Date of the appointment' })
    @Column({ type: DataType.STRING, allowNull: false })
    date: string;

    @ApiProperty({ example: false, description: 'Status of the appointment (true if attended, false otherwise)' })
    @Column({ type: DataType.BOOLEAN, allowNull: false })
    status: boolean;

    @ApiProperty({ example: "9:30", description: 'time of appointments' })
    @Column({ type: DataType.STRING, allowNull: false })
    time: string;

    @ApiProperty({ example: 'Take medication twice daily', description: 'Additional notes for treatment' })
    @Column({ type: DataType.TEXT, allowNull: true })
    notes: string;

    @ApiProperty({ example: 'Paracetamol, Ibuprofen', description: 'Prescription details for the diagnosis' })
    @Column({ type: DataType.STRING, allowNull: true })
    prescription: string;


    @BelongsTo(() => ServicesModel, { foreignKey: 'service_id' })
    services: ServicesModel;

    @BelongsTo(() => DiagnosesModel, { foreignKey: 'diagnosis_id' })
    diagnosis: DiagnosesModel;

    @BelongsTo(() => PatientsModel, { foreignKey: 'patient_id' })
    patient: PatientsModel;

    @BelongsTo(() => DoctorsModel, { foreignKey: 'doctor_id' })
    doctor: DoctorsModel;

}
