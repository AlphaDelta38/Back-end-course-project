import { ApiProperty } from "@nestjs/swagger";

export class CreateDiagnosesDto {
    @ApiProperty({ example: 'Hypertension', description: 'Patient\'s diagnosis.' })
    diagnosis: string;

    @ApiProperty({ example: '1 tablet daily', description: 'Treatment notes or dosage.' })
    notes?: string;

    @ApiProperty({ example: 'Paracetamol', description: 'Prescribed medication.' })
    prescription: string;
}
