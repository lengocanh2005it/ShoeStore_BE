import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateOrdersDetailDto {
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  readonly quantity: number;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  readonly size: number;

  @IsNotEmpty()
  @IsString()
  readonly color: string;

  @IsNotEmpty()
  @IsUUID()
  @IsNotEmpty()
  readonly product_id: string;
}
