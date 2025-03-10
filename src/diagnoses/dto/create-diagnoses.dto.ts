import { ApiProperty } from "@nestjs/swagger";

export class CreateDiagnosesDto {
    @ApiProperty({ example: 'Hypertension', description: 'Patient\'s diagnosis.' })
    diagnosis: string;

}
