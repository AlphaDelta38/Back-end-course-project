import {ApiProperty} from "@nestjs/swagger";

export class RolesDto {
    @ApiProperty({example: 'admin', description: 'Defines user access level'})
    readonly role: string
}