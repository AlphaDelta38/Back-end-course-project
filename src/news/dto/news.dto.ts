import { ApiProperty } from "@nestjs/swagger";

export class NewsDto {
    @ApiProperty({ example: 1, description: 'Unique News id.' })
    id: number;

    @ApiProperty({ example: 'Breaking News Title', description: 'News title.' })
    title: string;

    @ApiProperty({ example: 'Detailed description...', description: 'News content (optional).' })
    text?: string;

    @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Image URL.' })
    image_link: string;
}
