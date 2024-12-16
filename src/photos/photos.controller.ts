import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
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

    @Put(':id')
    async updatePhoto(@Body() updatePhotoDto: UpdatePhotoDto): Promise<Photo> {
        return await this.photosService.insertPhoto(updatePhotoDto);
    }

    @Delete(':id')
    async deletePhoto(@Body() id: string): Promise<Photo> {
        return await this.photosService.deletePhoto(id);
    }
}
