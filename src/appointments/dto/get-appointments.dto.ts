import { ApiProperty } from "@nestjs/swagger";

export class GetAppointmentsDto {
    @ApiProperty({ example: 1, description: 'ID of the patient or doctor' })
    id: number;

    @ApiProperty({ example: 'doctor', description: 'Search type: \'doctor\' or \'patient\'' })
    type: string;
}
