import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateOrdersDetailDto } from 'src/orders_details/dto/create-orders_detail.dto';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly total_price: number;

  @IsString()
  @IsNotEmpty()
  readonly shipping_address: string;

  @IsOptional()
  readonly shipping_fee: number;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  readonly user_id: string;

  @IsOptional()
  readonly code?: string;

  @ValidateNested({ each: true })
  @Type(() => CreateOrdersDetailDto)
  @ArrayNotEmpty()
  readonly orderDetails: CreateOrdersDetailDto[];
}
