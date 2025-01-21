import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @IsString()
  @IsNotEmpty()
  readonly phone_number!: string;
}
