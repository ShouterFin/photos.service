import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';

@Controller('photos')
export class PhotosController {
    constructor(private readonly photosService: PhotosService) {}

    @Post()
    async createPhotoUsingEmail(@Body() createPhotoDto: CreatePhotoDto): Promise<Photo> {
        return await this.photosService.insertPhoto(createPhotoDto);
    }

    @Get()
    async getPhotos(): Promise<Photo[]> {
        return await this.photosService.getPhotos();
    }

    @Put(':name')
    async updatePhoto(@Param('name') name: string, @Body() updatePhotoDto: UpdatePhotoDto): Promise<Photo> {
        return await this.photosService.updatePhoto(name, updatePhotoDto);
    }

    @Delete(':name')
    async deletePhoto(@Param('name') name: string): Promise<Photo> {
        return await this.photosService.deletePhoto(name);
    }
}
