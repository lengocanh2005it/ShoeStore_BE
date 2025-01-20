import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { v4 as uuidv4 } from 'uuid';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileExtension = file.originalname.split('.').pop();
          const fileNameWithoutExtension = file.originalname
            .split('.')
            .slice(0, -1)
            .join('.');
          const filename = `${fileNameWithoutExtension}-${uuidv4()}.${fileExtension}`;
          cb(null, filename);
        },
      }),
    }),
    UsersModule,
  ],
  providers: [UploadsService, UsersService],
  controllers: [UploadsController],
})
export class UploadsModule {}
