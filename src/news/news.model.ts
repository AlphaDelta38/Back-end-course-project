import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface NewsInterface {
    id: number,
    title: string,
    text: string,
    image_link: string
}

@Table({ tableName: 'news', createdAt: true, updatedAt: true })
export class NewsModel extends Model<NewsModel, NewsInterface> {

    @ApiProperty({ example: 1, description: 'Unique News id.' })
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'Breaking News Title', description: 'News title.' })
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @ApiProperty({ example: 'Detailed description...', description: 'News content.' })
    @Column({type: DataType.TEXT, allowNull: false})
    text: string;

    @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Image URL.' })
    @Column({type: DataType.TEXT, allowNull: false})
    image_link: string;
}