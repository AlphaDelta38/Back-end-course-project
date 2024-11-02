import { ApiProperty } from "@nestjs/swagger";

export class PatientDto {
    @ApiProperty({ example: '1', description: 'Unique Patient id.' })
    id: number;

    @ApiProperty({ example: 'John', description: 'First name of the patient.' })
    first_name: string;

    @ApiProperty({ example: 'Doe', description: 'Last name of the patient.' })
    last_name: string;

    @ApiProperty({ example: '1990-01-01', description: 'Date of birth of the patient.' })
    date_of_birth: Date;

    @ApiProperty({ example: 'M', description: 'Gender of the patient (M or F).' })
    gender: string;

    @ApiProperty({ example: '+123456789', description: 'Phone number of the patient.' })
    phone: string;

    @ApiProperty({ example: 'johndoe@example.com', description: 'Email of the patient.' })
    email: string;

    @ApiProperty({ example: '123 Main St, City, Country', description: 'Address of the patient.' })
    address: string;

    @ApiProperty({ example: 'INS1234567', description: 'Insurance number of the patient.' })
    insurance_number: string;

    @ApiProperty({ example: 'password123', description: 'Password of the patient.' })
    password: string;
}
