import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  async create(createUserDto: CreateUserDto) {
    try {
      // Create new user instance
      const user = new User();
      user.email = createUserDto.email;
      user.password = createUserDto.password;
      user.name = createUserDto.name;
      user.phone_number = createUserDto.phone_number;
      user.role = createUserDto.role;
      
      // Save to database
      await user.save();

      console.log('>>> check user: ', user);
      
      // Return created user
      return user;
    } catch (error) {
      throw new Error('Could not create user: ' + error.message);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
