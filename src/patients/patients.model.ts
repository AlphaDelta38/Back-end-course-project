import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface PatientInterface {
    id: number,
    first_name: string;
    last_name: string;
    date_of_birth: Date;
    gender: string;
    phone: string;
    email: string;
    address: string;
    insurance_number: string;
    password: string;
}

@Table({ tableName: 'patients', createdAt: true, updatedAt: true })
export class PatientModel extends Model<PatientModel, PatientInterface> {
    
    @ApiProperty({ example: '1', description: 'Unique Patient id.' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'John', description: 'First name of the patient.' })
    @Column({ type: DataType.STRING, allowNull: false })
    first_name: string;

    @ApiProperty({ example: 'Doe', description: 'Last name of the patient.' })
    @Column({ type: DataType.STRING, allowNull: false })
    last_name: string;

    @ApiProperty({ example: '1990-01-01', description: 'Date of birth of the patient.' })
    @Column({ type: DataType.DATE, allowNull: false })
    date_of_birth: Date;

    @ApiProperty({ example: 'M', description: 'Gender of the patient (M or F).' })
    @Column({ type: DataType.ENUM('M', 'F'), allowNull: false })
    gender: string;

    @ApiProperty({ example: '+123456789', description: 'Phone number of the patient.' })
    @Column({ type: DataType.STRING })
    phone: string;

    @ApiProperty({ example: 'johndoe@example.com', description: 'Email of the patient.' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({ example: '123 Main St, City, Country', description: 'Address of the patient.' })
    @Column({ type: DataType.STRING })
    address: string;

    @ApiProperty({ example: 'INS1234567', description: 'Insurance number of the patient.' })
    @Column({ type: DataType.STRING })
    insurance_number: string;

    @ApiProperty({ example: 'password123', description: 'Password of the patient.' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;
}