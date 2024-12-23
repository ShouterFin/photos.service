import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import * as readline from 'readline';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Photos Service')
    .setDescription('API documentation for the Photos Service')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const usersService = app.get(UsersService);

  const users = await usersService.findUsers();
  if (users.length === 0) {
    console.log('No users found. Please create an admin user.');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const question = (query: string): Promise<string> => {
      return new Promise((resolve) => rl.question(query, resolve));
    };

    const username = await question('Enter admin username: ');
    const password = await question('Enter admin password: ');
    const name = await question('Enter admin name: ');

    const createUserDto: CreateUserDto = {
      username,
      password,
      name,
      profile: null,
    };

    await usersService.insertUser(createUserDto);
    console.log('Admin user created successfully.');
    rl.close();
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();