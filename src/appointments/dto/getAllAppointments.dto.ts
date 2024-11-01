import {ApiProperty} from "@nestjs/swagger";


export class getAllAppointmentsDto {
    @ApiProperty({example: 1, description:"id of patient or doctor"})
    id: number
    @ApiProperty({example: "doctor / patient", description:"type for serach in database"})
    type: string
}