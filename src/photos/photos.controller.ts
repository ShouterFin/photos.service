import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('photos')
@ApiBearerAuth()
@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @ApiOperation({ summary: 'Create a new photo' })
  @ApiResponse({ status: 201, description: 'The photo has been successfully created.', type: Photo })
  @Post()
  async createPhoto(@Body() createPhotoDto: CreatePhotoDto): Promise<Photo> {
    return await this.photosService.insertPhoto(createPhotoDto);
  }

  @ApiOperation({ summary: 'Get all photos' })
  @ApiResponse({ status: 200, description: 'Return all photos.', type: [Photo] })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getPhotos(): Promise<Photo[]> {
    return await this.photosService.getPhotos();
  }

  @ApiOperation({ summary: 'Update a photo' })
  @ApiResponse({ status: 200, description: 'The photo has been successfully updated.', type: Photo })
  @ApiResponse({ status: 404, description: 'Photo not found.' })
  @Put(':name')
  @UseGuards(JwtAuthGuard)
  async updatePhoto(@Param('name') name: string, @Body() updatePhotoDto: UpdatePhotoDto): Promise<Photo> {
    return await this.photosService.updatePhoto(name, updatePhotoDto);
  }

  @ApiOperation({ summary: 'Delete a photo' })
  @ApiResponse({ status: 200, description: 'The photo has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Photo not found.' })
  @Delete(':name')
  @UseGuards(JwtAuthGuard)
  async deletePhoto(@Param('name') name: string): Promise<Photo> {
    return await this.photosService.deletePhoto(name);
  }
}