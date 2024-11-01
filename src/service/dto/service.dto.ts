import {ApiProperty} from "@nestjs/swagger";


export class ServiceDto {
    @ApiProperty({example: "appointment", description:"name of service"})
    readonly service: string
}