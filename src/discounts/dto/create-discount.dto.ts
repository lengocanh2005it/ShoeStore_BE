import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { discountStatus } from '../enums/discounts.enum';

export class CreateDiscountDto {
  @IsString()
  @IsNotEmpty()
  readonly code?: string;

  @IsNumber()
  @IsNotEmpty()
  readonly value?: number;

  @IsNotEmpty()
  readonly start_date: Date;

  @IsNotEmpty()
  readonly end_date: Date;

  @IsOptional()
  @IsEnum(discountStatus)
  readonly status: discountStatus;
}
