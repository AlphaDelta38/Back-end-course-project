import {ApiProperty} from "@nestjs/swagger";


export class RolesDto {
    @ApiProperty({example: "admin", description: "role for the doctor"})
    readonly role: string
}