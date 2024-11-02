import { ApiProperty } from "@nestjs/swagger";


export class ServiceDto {
    @ApiProperty({example: "blood test", description:"Service name."})
    readonly service: string
}