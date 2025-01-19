import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { discountStatus } from 'src/discounts/enums/discounts.enum';

export class UpdateDiscountDto {
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
