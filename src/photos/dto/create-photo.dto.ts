import { IsEmail, IsNotEmpty, IsString, IsUrl, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePhotoDto {
  @ApiProperty({ example: 'Sunset', description: 'The name of the photo' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Beach', description: 'The location of the photo' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 'A beautiful sunset at the beach', description: 'The description of the photo' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'http://example.com/photo.jpg', description: 'The URL of the photo' })
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ example: 'user@example.com', description: 'The email of the owner' })
  @IsEmail()
  @IsNotEmpty()
  owner: string;

  @ApiProperty({ example: ['Nature', 'Beach'], description: 'The categories of the photo', type: [String] })
  @IsArray()
  @IsString({ each: true })
  categories: string[];
}