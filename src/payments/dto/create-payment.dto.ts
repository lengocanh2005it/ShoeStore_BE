import { IsEnum, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { PaymentMethod } from '../enums/paymentMethod.enum';
import { PaymentStatus } from '../enums/paymentStatus.enum';

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
}
