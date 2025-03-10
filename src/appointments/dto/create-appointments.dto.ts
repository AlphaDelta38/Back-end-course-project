import { ApiProperty } from "@nestjs/swagger";

export class CreateAppointmentsDto {
    @ApiProperty({ example: 1, description: 'ID of the patient' })
    patient_id: number;

    @ApiProperty({ example: 2, description: 'ID of the doctor' })
    doctor_id: number;

    @ApiProperty({ example: 4, description: 'ID of the service' })
    service_id: number;

    @ApiProperty({ example: 4, description: 'ID of the diagnosis' })
    diagnosis_id: number;

    @ApiProperty({ example: '2024-04-22', description: 'Date of the appointment (YYYY-MM-DD format)' })
    date: string;

    @ApiProperty({ example: '8:30', description: 'time of appointments' })
    time: string;

    @ApiProperty({ example: true, description: 'Status of the appointment (true for active, false for canceled)' })
    status: boolean;
}
