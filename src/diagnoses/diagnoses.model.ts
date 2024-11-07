import { ApiProperty } from "@nestjs/swagger";
import { AppointmentsModel } from "../appointments/appointments.model";
import { Column, DataType, Table, HasOne, Model } from "sequelize-typescript";

interface DiagnosesInterface {
    id: number;
    diagnosis: string;
    notes?: string;
    prescription: string;
}

@Table({ tableName: 'diagnoses', createdAt: true, updatedAt: false })
export class DiagnosesModel extends Model<DiagnosesModel, DiagnosesInterface> {
    
    @ApiProperty({ example: 1, description: 'Unique Diagnosis id.' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'Hypertension', description: 'Diagnosis for the patient' })
    @Column({ type: DataType.STRING, allowNull: false })
    diagnosis: string;

    @ApiProperty({ example: 'Take medication twice daily', description: 'Additional notes for treatment' })
    @Column({ type: DataType.STRING, allowNull: true })
    notes: string;

    @ApiProperty({ example: 'Paracetamol, Ibuprofen', description: 'Prescription details for the diagnosis' })
    @Column({ type: DataType.STRING, allowNull: false })
    prescription: string;

    @HasOne(() => AppointmentsModel, { foreignKey: 'diagnosis_id' })
    appointment: AppointmentsModel;
}
