import {  IsEnum, IsString, IsNumber, IsNotEmpty, IsPositive, IsUUID } from 'class-validator';
import { OrderStatus } from '../enums/orderStatus.enum';


export class CreateOrderDto {
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    total_price: number;

    @IsEnum(OrderStatus)
    @IsNotEmpty()
    status: OrderStatus;

    @IsString()
    @IsNotEmpty()
    shipping_address: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    shipping_fee: number;

    @IsString()
    @IsUUID()
    @IsNotEmpty()
    readonly user_id: string;

    @IsString()
    @IsUUID()
    readonly discount_id: string;

    @IsString()
    @IsUUID()
    @IsNotEmpty()
    readonly payment_id: string;
}

