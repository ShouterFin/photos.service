import { IsEmail, IsNotEmpty, IsString, IsUrl, IsArray } from "class-validator";

export class CreatePhotoDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsUrl()
    @IsNotEmpty()
    url: string;

    @IsEmail()
    @IsNotEmpty()
    owner: string;

    @IsArray()
    @IsString({each: true})
    categories: string[];
}