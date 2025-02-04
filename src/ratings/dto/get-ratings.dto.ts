import { ApiProperty } from "@nestjs/swagger";

export class GetRatingsDto {
    @ApiProperty({ example: 1, description: 'ID of the patient or doctor' })
    id: number;

    @ApiProperty({ example: 'doctor', description: 'Search type: \'doctor\' or \'patient\'' })
    type: string;

    @ApiProperty({ example: '10', description: 'limit of object to response' })
    readonly limit: number

    @ApiProperty({ example: '1', description: 'offset / page of request objects' })
    readonly page: number
}
