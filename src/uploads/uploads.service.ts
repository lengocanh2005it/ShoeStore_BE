import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UploadsService {
  constructor(private readonly usersService: UsersService) {}

  async handleCreateUsersFromJSONFile(data: CreateUserDto[]): Promise<any> {
    return await this.usersService.createUsersFromJSONFile(data);
  }
}
