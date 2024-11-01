import {ApiProperty} from "@nestjs/swagger";


export class AppointmentDto {
    @ApiProperty({example: 1, description:"id of patient"})
    patient_id: number
    @ApiProperty({example: 2, description:"id of doctor"})
    doctor_id: number
    @ApiProperty({example: 4, description:"id of service"})
    service_id: number
    @ApiProperty({example: 4, description:"id of diagnosis"})
    diagnosis_id: number
    @ApiProperty({example: "22-04-2024", description:"date of appointment"})
    date: string
    @ApiProperty({example: true, description:"status of appointments true/false "})
    status: boolean
    @ApiProperty({example: 1, description:"id of appointments allowNull true, and required if its not update method "})
    id: number
}