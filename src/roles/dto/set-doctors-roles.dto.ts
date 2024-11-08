import { ApiProperty } from "@nestjs/swagger";

export class SetDoctorsRoles {
    @ApiProperty({example: [1,2,3], description: 'roles id'})
    readonly massiveId: number[]
    @ApiProperty({example: 1, description: 'doctor id'})
    readonly doctor_id: number
}