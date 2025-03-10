import { ApiProperty } from "@nestjs/swagger";

export class DiagnosesDto {
    @ApiProperty({example: 1, description:'Unique Diagnoses id. '})
    id: number

    @ApiProperty({ example: 'Hypertension', description: 'Patient\'s diagnosis.' })
    diagnosis: string;

}


export class getAllDiagnosesParams{
    limit?: number
    page?: number
}