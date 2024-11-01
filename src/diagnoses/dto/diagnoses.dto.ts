import {ApiProperty} from "@nestjs/swagger";


export class DiagnosesDto {
    @ApiProperty({example: "rack", description:"diagnosis"})
    diagnosis: string
    @ApiProperty({example: "1 tablets per day", description:"notes for tablets or something, or some rules"})
    notes?: string
    @ApiProperty({example: "parachetamol", description:"tablats or something "})
    prescription: string

    @ApiProperty({example: 1, description:"id for update, required not use for other method only for update "})
    id: number
}