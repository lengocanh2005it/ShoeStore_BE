import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from 'src/auth/utils/serializer';
import { GoogleStrategy } from 'src/auth/strategies/google.strategy';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('ACCESS_TOKEN_LIFE'),
        },
      }),
    }),
    UsersModule,
    PassportModule.register({
      session: true,
      defaultStrategy: 'local',
    }),
  ],
  providers: [
    AuthService,
    GoogleStrategy,
    UsersService,
    SessionSerializer,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
