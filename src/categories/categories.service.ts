import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoriesRepository.create(createCategoryDto);
    return await this.categoriesRepository.save(category);
  }

  async findByName(name: string): Promise<Category> {
    return await this.categoriesRepository.findOne({ where: { name } });
  }

  async getCategories(): Promise<Category[]> {
    return await this.categoriesRepository.find({relations: ['photos']});
  }

  // update category using updateCategoryDto
  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoriesRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    this.categoriesRepository.merge(category, updateCategoryDto);
    return await this.categoriesRepository.save(category);
  }

  // delete category
  async deleteCategory(name: string): Promise<Category> {
    const category = await this.categoriesRepository.findOne({ where: { name } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return await this.categoriesRepository.remove(category);
  }
}