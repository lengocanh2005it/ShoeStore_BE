import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from "class-validator";
import { PaymentMethod } from "../enums/paymentMethod.enum";
import { PaymentStatus } from "../enums/paymentStatus.enum";

export class CreatePaymentDto {
    @IsEnum(PaymentStatus)
    @IsNotEmpty()
    readonly status: PaymentStatus;

    @IsEnum(PaymentMethod)
    @IsNotEmpty()
    readonly method: PaymentMethod;
    
    @IsNotEmpty()
    readonly payment_date: Date;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly amount: number;

    @IsString()
    @IsUUID()
    @IsOptional()
    @IsNotEmpty()
    readonly order_id: string
}
