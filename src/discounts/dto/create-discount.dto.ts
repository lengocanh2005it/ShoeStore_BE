import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDiscountDto {
  @IsString()
  @IsNotEmpty()
  readonly code?: string;

  @IsNumber()
  @IsNotEmpty()
  readonly value?: number;
}
