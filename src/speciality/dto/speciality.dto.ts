import {ApiProperty} from "@nestjs/swagger";


export class specialityDto{
    @ApiProperty({ example: 'Surgeon', description: 'name speciality of doctor' })
    readonly name: string
}


export class getAllSpecialityParams{
    limit?: number
    page?: number
    role?: string
}
