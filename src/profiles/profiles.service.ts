import { Injectable } from '@nestjs/common';
import { Profile } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfilesService {
    constructor(@InjectRepository(Profile) private readonly usersRepository: Repository<Profile>) {}

    async insertProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
        const profile = new Profile();
        profile.gender = createProfileDto.gender;
        profile.photo = createProfileDto.photo;
        return await this.usersRepository.save(profile);
    }
}
