import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
    @ApiProperty({ example: 'johndoe@example.com', description: 'Email of the user.' })
    email: string;

    @ApiProperty({ example: 'password123', description: 'Password of the user.' })
    password: string;

    @ApiProperty({ example: true, description: 'Type of the user' })
    isPatient: boolean;
}
