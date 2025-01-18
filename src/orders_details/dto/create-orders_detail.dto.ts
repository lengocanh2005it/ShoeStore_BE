import { IsNotEmpty, IsNumber, IsString, IsUUID, IsDecimal, IsPositive, isNumber } from 'class-validator';

export class CreateOrdersDetailDto {
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  size: number;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  unit_price: number;

  @IsNotEmpty()
  @IsUUID()
  order_id: string;

  @IsNotEmpty()
  @IsUUID()
  product_id: string;
}