import { ApiProperty } from "@nestjs/swagger";

export class CreateNewsDto {
    @ApiProperty({ example: 'Breaking News Title', description: 'News title.' })
    title: string;

    @ApiProperty({ example: 'Detailed description...', description: 'News content.' })
    text: string;

    @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Image URL.' })
    image_link: string;
}
