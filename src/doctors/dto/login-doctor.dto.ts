import { ApiProperty } from "@nestjs/swagger";

export class LoginDoctorDto {
    @ApiProperty({ example: 'johndoe@example.com', description: 'Email of the doctor.' })
    email: string;

    @ApiProperty({ example: 'password123', description: 'Password for the doctor\'s account.' })
    password: string;
}