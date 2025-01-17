import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email!: string;

  @IsString()
  @IsNotEmpty()
  readonly full_name!: string;

  @IsString()
  @IsNotEmpty()
  readonly phone_number!: string;
}
