import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from './ormconfig';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), UsersModule, ProfilesModule, PhotosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
