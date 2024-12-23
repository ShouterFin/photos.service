import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAccessToken } from './auth/dto/jwt-access-token.interface';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Get Hello message' })
  @ApiResponse({ status: 200, description: 'Return Hello message.' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 201, description: 'User logged in successfully.'})
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req): Promise<JwtAccessToken> {
    const token = await this.authService.login(req.user);
    return token;
  }
}