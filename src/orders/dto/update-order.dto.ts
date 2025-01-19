import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from 'src/orders/enums/orderStatus.enum';

export class UpdateOrderDto {
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  readonly status: OrderStatus;

  @IsString()
  @IsNotEmpty()
  readonly shipping_address: string;

  @IsOptional()
  readonly discount_id: string;
}
