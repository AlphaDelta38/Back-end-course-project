import { ApiProperty } from "@nestjs/swagger";

export class SetDoctorsRoles {
    @ApiProperty({example: [1,2,3], description: 'ID of the roles'})
    readonly massiveId: number[]

    @ApiProperty({example: 1, description: 'ID of the doctor'})
    readonly doctor_id: number
}