import { ApiProperty } from "@nestjs/swagger";

export class SetDoctorsRolesDto {
    @ApiProperty({ example: 1, description: "ID of the doctor whose roles are being set." })
    doctor_id: number;

    @ApiProperty({ example: [1, 2, 3], description: "IDs of the roles assigned to the doctor." })
    roles_id: number[];
}
