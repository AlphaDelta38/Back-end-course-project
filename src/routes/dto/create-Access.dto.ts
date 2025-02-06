import {ApiProperty} from "@nestjs/swagger";


export class CreateAccessDto {
    @ApiProperty({example: 1, description:" id of role for create/update"})
    readonly role_id: number
    @ApiProperty({example: "POST /service, GET /service", description:" path of endpoints and it allows use this endpoints"})
    readonly routes: string[]
}