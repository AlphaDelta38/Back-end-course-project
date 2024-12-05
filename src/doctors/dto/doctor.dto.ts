import { ApiProperty } from "@nestjs/swagger";
import {forwards} from "../../news/dto/news.dto";

export class DoctorsDto {
    @ApiProperty({ example: 1, description: 'Unique Doctors id.' })
    id: number;

    @ApiProperty({ example: 'John', description: 'First name of the doctor.' })
    first_name: string;

    @ApiProperty({ example: 'Doe', description: 'Last name of the doctor.' })
    last_name: string;

    @ApiProperty({ example: '1990-01-01', description: 'Date of birth of the doctor.' })
    date_of_birth: Date;

    @ApiProperty({ example: 'M', description: 'Gender of the doctor (M or F).' })
    gender: string;

    @ApiProperty({ example: '+123456789', description: 'Phone number of the doctor.' })
    phone: string;

    @ApiProperty({ example: 'johndoe@example.com', description: 'Email of the doctor.' })
    email: string;

    @ApiProperty({ example: '123 Main St, City, Country', description: 'Address of the doctor.' })
    address: string;

    @ApiProperty({ example: '101', description: 'Office number of the doctor.' })
    office_number: string;

    @ApiProperty({ example: 'Cardiology', description: 'Speciality of the doctor.' })
    speciality: string;

    @ApiProperty({ example: 'password123', description: 'Password for the doctor\'s account.' })
    password: string;

    @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Link to the doctor\'s profile image.' })
    image_link: string;
}



export class getAllDoctorParams{
    limit?: number
    page?: number
    role?: string
}
