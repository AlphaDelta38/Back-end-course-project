import { ApiProperty } from "@nestjs/swagger";




export class setDoctorRolesDto {
    @ApiProperty({ example: 1, description: 'id of doctor' })
    doctor_id: number;

    @ApiProperty({ example: [1,2,3], description: "id of roles"})
    roles_id: number[];
}