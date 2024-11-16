import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ProfilesService } from 'src/profiles/profiles.service';

import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {

    private slatRounds = 10;
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>, private readonly profilesService: ProfilesService) {}

    async insertUser(createUserDto: CreateUserDto): Promise<User> {
        let profile: Profile = null;
        if (createUserDto.profile) {
            profile = await this.profilesService.insertProfile(createUserDto.profile);
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, this.slatRounds);
        const user = this.usersRepository.create({
            'username': createUserDto.username,
            'password': hashedPassword,
            'name': createUserDto.name,
            'profile': profile
        });
        try {
            return await this.usersRepository.save(user);
        } catch (error) {
            // Error code for duplicate entry, mysql specific
            if(error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException("Error while saving user");
            }
        }
    }

    async findUsers(): Promise<User[]> {
        // return await this.usersRepository.find();
        return await this.usersRepository.find({relations: ['profile', 'photos']});
    }

    async findUserById(id: string): Promise<User> {
        const user = await this.usersRepository.findOne(
            {
                where: {id}, 
                relations: ['profile', 'photos']
            });
        if (!user) {
            throw new NotFoundException('Id not found');
        }
        return {...user};
    }

    async findUserByEmail(username: string): Promise<User> {
        const user = await this.usersRepository.findOne({where: {username}});
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return {...user};
    }
}
