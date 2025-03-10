import { ApiProperty } from "@nestjs/swagger";

export class CreateRatingsDto {
    @ApiProperty({ example: 1, description: 'ID of the doctor being rated.' })
    doctor_id: number;

    @ApiProperty({ example: 1, description: 'ID of the patient giving the rating.' })
    patient_id: number;

    @ApiProperty({ example: 4.5, description: 'Rating given by the patient, between 0 and 5.' })
    rating: number;
}
