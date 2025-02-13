import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { encodePassword } from 'src/utils/bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/auth/dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/users/enums/users.enum';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    await this.initAccounts();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    const isHasExistedEmail = await this.userRepository.countBy({ email });

    if (isHasExistedEmail)
      throw new BadRequestException('Email has been existed.');

    const user = this.userRepository.create(createUserDto);

    return await this.userRepository.save({
      ...user,
      password: encodePassword(createUserDto.password),
    });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string, queries?: Record<string, string>) {
    let user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException('User Not Found.');

    if (queries && queries.orders === 'true') {
      user = await this.userRepository.findOne({
        where: { id },
        relations: [
          'orders',
          'orders.orderDetails',
          'orders.discount',
          'orders.payment',
          'orders.orderDetails.product',
        ],
      });

      return user.orders;
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    await this.userRepository.update(
      {
        id,
      },
      updateUserDto,
    );

    return user;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User Not Found.');
    await this.userRepository.delete(user.id);
  }

  async verifyUser(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new NotFoundException('User Not Found.');
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Password not correct.');
    return user;
  }

  async createUserGoogle(displayName: string, email: string) {
    const newUser = this.userRepository.create({
      email,
      name: displayName,
    });

    return await this.userRepository.save(newUser);
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async createUsersFromJSONFile(data: CreateUserDto[]): Promise<any> {
    const validData = [] as CreateUserDto[];
    const errorAccounts = [] as User[];
    const successAccounts = [] as User[];

    for (const createUserDto of data) {
      if (
        !createUserDto.email ||
        !createUserDto.name ||
        !createUserDto.password ||
        !createUserDto.phone_number
      )
        throw new BadRequestException('Bad Request Exception.');
      validData.push(createUserDto);
    }

    for (const data of validData) {
      const user = await this.findUserByEmail(data.email);

      if (user) {
        errorAccounts.push(user);
      } else {
        const newUser = await this.create(data);
        successAccounts.push(newUser);
      }
    }

    return {
      successAccounts,
      errorAccounts,
    };
  }

  private initAccounts = async (): Promise<void> => {
    const existedDefaultUserAccount = await this.userRepository.findOneBy({
      email: 'user@gmail.com',
    });

    const existedDefaultAdminAccount = await this.userRepository.findOneBy({
      email: 'admin@gmail.com',
    });

    if (!existedDefaultUserAccount) {
      const newUser = this.userRepository.create({
        email: 'user@gmail.com',
        password: encodePassword('123456'),
        name: `Default User`,
        phone_number: '123456789',
      });

      await this.userRepository.save(newUser);
    }

    if (!existedDefaultAdminAccount) {
      const newAdminUser = this.userRepository.create({
        email: 'admin@gmail.com',
        password: encodePassword('123456'),
        name: `I'm Admin`,
        phone_number: '123456789',
        role: UserRole.ADMIN,
      });

      await this.userRepository.save(newAdminUser);
    }
  };
}
