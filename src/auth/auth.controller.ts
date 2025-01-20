import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dto/auth.dto';
import { GoogleAuthGuard } from 'src/auth/guards/google.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RoleAuthGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/utils/role.decorator';
import { Role } from 'src/auth/utils/role.enum';
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
  async login(@Body() loginDto: LoginDto, @Req() req: any): Promise<any> {
    const response = await this.authService.handleLogin(loginDto);

    const { userId, accessToken, refreshToken } = response;

    req.session.user = {
      userId,
      accessToken,
      refreshToken,
    };

    return {
      accessToken,
      refreshToken,
    };
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, createdAt, updatedAt, ...res } =
      await this.usersService.create(createUserDto);

    return res as User;
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles(Role.ADMIN, Role.USER)
  async getProfile(@Req() request: any): Promise<any> {
    if (!request.session.user || !request.session.user.userId) {
      throw new UnauthorizedException('User Not Authenticated.');
    }

    const userId = request.session.user.userId as string;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, createdAt, updatedAt, ...res } =
      await this.usersService.findOne(userId);

    return res;
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
