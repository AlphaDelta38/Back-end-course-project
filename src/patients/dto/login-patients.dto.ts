import { ApiProperty } from "@nestjs/swagger";

export class LoginPatientDto {

    @ApiProperty({ example: 'johndoe@example.com', description: 'Email of the patient.' })
    email: string;

    @ApiProperty({ example: 'password123', description: 'Password of the patient.' })
    password: string;
}
