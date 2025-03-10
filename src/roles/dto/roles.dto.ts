import {ApiProperty} from "@nestjs/swagger";

export class RolesDto {
    @ApiProperty({example: 'admin', description: 'Defines user access level'})
    readonly role: string
}

export class RolesParamsDto{
    readonly limit: number
    readonly page: number
    readonly all?: string
}