import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, LoginGoogleDto } from 'src/auth/dto/auth.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async handleLogin(loginDto: LoginDto) {
    const user = await this.usersService.verifyUser(loginDto);

    const { id } = user;

    const accessToken = this.jwtService.sign(
      { userId: id },
      {
        expiresIn: this.configService.get('ACCESS_TOKEN_LIFE'),
        secret: this.configService.get('JWT_SECRET_KEY'),
      },
    );

    const refreshToken = this.jwtService.sign(
      { userId: id },
      {
        expiresIn: this.configService.get('REFRESH_TOKEN_LIFE'),
        secret: this.configService.get('JWT_SECRET_KEY'),
      },
    );

    return {
      userId: id,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(token: string): Promise<string> {
    const { userId } = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_SECRET_KEY'),
    });

    let user = null as User;

    if (userId) {
      user = (await this.usersService.findOne(userId)) as User;
    }

    if (!user) throw new UnauthorizedException('Unauthenticated.');

    const payload = {
      userId: user.id,
    };

    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get('ACCESS_TOKEN_LIFE'),
      secret: this.configService.get('JWT_SECRET_KEY'),
    });
  }

  async handleLoginByGoogle(loginGoogleDto: LoginGoogleDto) {
    const { emails, displayName } = loginGoogleDto;

    const users = await this.usersService.findAll();

    const isExistedEmail = users
      .map((user) => user.email)
      .some((email) => emails.map((obj) => obj.value).includes(email));

    if (isExistedEmail)
      throw new BadRequestException('Email has been existed.');

    const newUser = await this.usersService.createUserGoogle(
      displayName,
      emails[0].value,
    );

    const accessToken = this.jwtService.sign(
      { userId: newUser.id },
      {
        expiresIn: this.configService.get('ACCESS_TOKEN_LIFE'),
        secret: this.configService.get('JWT_SECRET_KEY'),
      },
    );

    const refreshToken = this.jwtService.sign(
      { userId: newUser.id },
      {
        expiresIn: this.configService.get('REFRESH_TOKEN_LIFE'),
        secret: this.configService.get('JWT_SECRET_KEY'),
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
