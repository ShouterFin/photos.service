import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProfileDto {
    @IsEmail()
    @IsNotEmpty()
    gender: string;

    @IsNotEmpty()
    @IsString()
    photo: string;
}