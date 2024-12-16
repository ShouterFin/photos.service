import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    async createUser(@Body()createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.insertUser(createUserDto);
    }

    @Get()
    async getUsers(): Promise<User[]> {
        return await this.usersService.findUsers();
    }

    @Get(':id')
    async getUser(@Param('id') id: string): Promise<User> {
        return await this.usersService.findUserById(id);
    }

    @Get(':username')
    async getUserByEmail(@Param('username') username: string): Promise<User> {
        return await this.usersService.findUserByEmail(username);
    }

    // Update user using updateUserDto
    @Put(':username')
    async updateUser(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return await this.usersService.updateUser(username, updateUserDto);
    }

    @Delete(':username')
    async deleteUser(@Param('username') username: string): Promise<void> {
        return await this.usersService.deleteUser(username);
    }
}
