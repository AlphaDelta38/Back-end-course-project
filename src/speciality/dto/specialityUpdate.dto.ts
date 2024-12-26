import {ApiProperty} from "@nestjs/swagger";


export class specialityUpdateDto{
    @ApiProperty({ example: 1, description: 'id of speciality' })
    readonly id: number
    @ApiProperty({ example: 'Surgeon', description: 'name speciality of doctor' })
    readonly name: string
}