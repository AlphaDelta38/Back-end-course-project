import {ApiProperty} from "@nestjs/swagger";




export class UpdateRoleDto {
    @ApiProperty({example: '1', description: 'id of role'})
    readonly id: number

    @ApiProperty({example: 'admin', description: 'Defines user access level'})
    readonly role: string
}