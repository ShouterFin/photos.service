import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('categories')
@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'The category has been successfully created.', type: Category })
  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoriesService.createCategory(createCategoryDto);
  }

  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Return all categories.', type: [Category] })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getCategories(): Promise<Category[]> {
    return await this.categoriesService.getCategories();
  }

  @ApiOperation({ summary: 'Get a category by name' })
  @ApiResponse({ status: 200, description: 'Return the category.', type: Category })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  @Get(':name')
  @UseGuards(JwtAuthGuard)
  async getCategory(@Param('name') name: string): Promise<Category> {
    return await this.categoriesService.findByName(name);
  }

  @ApiOperation({ summary: 'Update a category' })
  @ApiResponse({ status: 200, description: 'The category has been successfully updated.', type: Category })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateCategory(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return await this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Delete a category' })
  @ApiResponse({ status: 200, description: 'The category has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  @Delete(':name')
  @UseGuards(JwtAuthGuard)
  async deleteCategory(@Param('name') name: string): Promise<Category> {
    return await this.categoriesService.deleteCategory(name);
  }
}