import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Category } from 'src/categories/entities/category.entity';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class PhotosService {
    constructor(@InjectRepository(Photo) private readonly photosRepository: Repository<Photo>, private readonly usersService: UsersService, private readonly categoriesService: CategoriesService) {}

    async insertPhoto(createPhotoDto: CreatePhotoDto): Promise<Photo> {
        const user = await this.usersService.findUserByEmail(createPhotoDto.owner);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const categories: Category[] = [];
        for (const categoryName of createPhotoDto.categories) {
            let category = await this.categoriesService.findByName(categoryName);
            if (!category) {
                category = await this.categoriesService.createCategory({ name: categoryName, description: '' });
            }
            categories.push(category);
        }

        const photo = new Photo();
        photo.name = createPhotoDto.name;
        photo.location = createPhotoDto.location;
        photo.description = createPhotoDto.description;
        photo.url = createPhotoDto.url;
        photo.user = user;
        photo.categories = categories;

        return await this.photosRepository.save(photo);
    }

    async getPhotos(): Promise<Photo[]> {
        return await this.photosRepository.find({relations: ['user']});
    }

    // update photo by id using updatephotoDto
    async updatePhoto(id: string, updatePhotoDto: UpdatePhotoDto): Promise<Photo> {
        const photo = await this.photosRepository.findOne({where: {id}});
        if (!photo) {
            throw new NotFoundException('Photo not found');
        }

        const user = await this.usersService.findUserByEmail(updatePhotoDto.owner);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const categories: Category[] = [];
        for (const categoryName of updatePhotoDto.categories) {
            let category = await this.categoriesService.findByName(categoryName);
            if (!category) {
                category = await this.categoriesService.createCategory({ name: categoryName, description: '' });
            }
            categories.push(category);
        }

        photo.name = updatePhotoDto.name;
        photo.location = updatePhotoDto.location;
        photo.description = updatePhotoDto.description;
        photo.url = updatePhotoDto.url;
        photo.user = user;
        photo.categories = categories;

        return await this.photosRepository.save(photo);
    }

    async deletePhoto(id: string): Promise<Photo> {
        const photo = await this.photosRepository.findOne({where: {id}});
        if (!photo) {
            throw new NotFoundException('Photo not found');
        }
        return await this.photosRepository.remove(photo);
    }
}
