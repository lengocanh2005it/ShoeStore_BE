import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UploadsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async handleCreateUsersFromJSONFile(data: CreateUserDto[]): Promise<any> {
    return await this.usersService.createUsersFromJSONFile(data);
  }

  public async uploadFile(file: Express.Multer.File): Promise<{ url: string }> {
    const port = this.configService.get<string>('PORT') || 3001;
    const fileUrl = `http://localhost:${port}/uploads/${file.filename}`;
    return { url: fileUrl };
  }
}
