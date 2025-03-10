import { ApiProperty } from "@nestjs/swagger";

export class ServicesDto {
    @ApiProperty({example: 'Blood test', description:'Service name.'})
    readonly service: string
}



export class getAllServicesParams{
    limit?: number
    page?: number
    role?: string
}
