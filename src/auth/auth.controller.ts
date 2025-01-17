import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dto/auth.dto';
import { GoogleAuthGuard } from 'src/auth/guards/google.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return await this.authService.handleLogin(loginDto);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Post('refresh-token')
  async handleRefreshToken(
    @Body('refreshToken') refreshToken: string,
  ): Promise<any> {
    if (refreshToken) {
      const accessToken = await this.authService.refreshToken(refreshToken);

      return {
        accessToken,
      };
    }
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async handleGoogleLogin() {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async handleGoogleRedirect(@Req() req: any, @Res() res: Response) {
    const user = req.user;

    if (user && user.accessToken && user.refreshToken) {
      const redirectUrl = `${this.configService.get<string>(
        'REDIRECT_URL_HOMEPAGE',
      )}?accessToken=${user.accessToken}&refreshToken=${user.refreshToken}`;

      return res.redirect(redirectUrl);
    }

    return res.redirect(
      this.configService.get<string>('REDIRECT_URL_LOGINPAGE'),
    );
  }
}
