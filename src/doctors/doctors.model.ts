import { ApiProperty } from "@nestjs/swagger";
import {BelongsTo, BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import { AppointmentsModel } from "../appointments/appointments.model";
import { DoctorsRolesModel } from "../roles/doctors-roles.model";
import { RolesModel } from "../roles/roles.model";
import { RatingsModel } from "../ratings/ratings.model";
import {SpecialityModel} from "../speciality/speciality.model";

interface DoctorsInterface {
    id: number;
    first_name: string;
    last_name: string;
    date_of_birth: Date;
    gender: string;
    phone?: string;
    email: string;
    address?: string;
    office_number?: string;
    speciality_id: number;
    password: string;
    image_link?: string;
}

@Table({ tableName: 'doctors', createdAt: true, updatedAt: true })
export class DoctorsModel extends Model<DoctorsModel, DoctorsInterface> {

    @ApiProperty({ example: 1, description: 'Unique Doctor ID.' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'John', description: 'First name of the doctor.' })
    @Column({ type: DataType.STRING, allowNull: false })
    first_name: string;

    @ApiProperty({ example: 'Doe', description: 'Last name of the doctor.' })
    @Column({ type: DataType.STRING, allowNull: false })
    last_name: string;

    @ApiProperty({ example: '1990-01-01', description: 'Date of birth of the doctor.' })
    @Column({ type: DataType.DATE, allowNull: false })
    date_of_birth: Date;

    @ApiProperty({ example: 'M', description: 'Gender of the doctor (M or F).' })
    @Column({ type: DataType.ENUM('M', 'F'), allowNull: false })
    gender: string;

    @ApiProperty({ example: '+123456789', description: 'Phone number of the doctor.' })
    @Column({ type: DataType.STRING })
    phone: string;

    @ApiProperty({ example: 'johndoe@example.com', description: 'Email of the doctor.' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({ example: '123 Main St, City, Country', description: 'Address of the doctor.' })
    @Column({ type: DataType.STRING })
    address: string;

    @ApiProperty({ example: '101', description: 'Office number of the doctor.' })
    @Column({ type: DataType.STRING })
    office_number: string;

    @ApiProperty({ example: 1, description: 'Example response: Surgeon' })
    @Column({ type: DataType.INTEGER, allowNull: true})
    speciality_id: number;

    @ApiProperty({ example: 'password123', description: 'Password for the doctor\'s account.' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Link to the doctor\'s profile image.' })
    @Column({ type: DataType.TEXT })
    image_link: string;

    @HasMany(() => AppointmentsModel, { foreignKey: 'doctor_id' })
    appointments: AppointmentsModel[];

    @HasMany(() => RatingsModel, {foreignKey: 'doctor_id'})
    raitings: RatingsModel[];

    @BelongsTo(()=>SpecialityModel, {foreignKey: 'speciality_id'})
    speciality: SpecialityModel;

    @BelongsToMany(()=>RolesModel, ()=>DoctorsRolesModel)
    roles:  RolesModel[];






}
