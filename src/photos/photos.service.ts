import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreatePhotoDto } from './dto/create-photo.dto';

@Injectable()
export class PhotosService {
    constructor(@InjectRepository(Photo) private readonly photosRepository: Repository<Photo>, private readonly usersService: UsersService) {}

    async insertPhoto(createPhotoDto: CreatePhotoDto): Promise<Photo> {
        const user = await this.usersService.findUserByEmail(createPhotoDto.owner);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const photo = new Photo();
        photo.name = createPhotoDto.name;
        photo.location = createPhotoDto.location;
        photo.description = createPhotoDto.description;
        photo.url = createPhotoDto.url;
        photo.user = user;

        return await this.photosRepository.save(photo);
    }

    async getPhotos(): Promise<Photo[]> {
        return await this.photosRepository.find({relations: ['user']});
    }
}