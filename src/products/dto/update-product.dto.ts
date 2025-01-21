import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsOptional()
  readonly code?: string;

  @IsNumber()
  @IsPositive()
  readonly stock_quantity: number;

  @IsString()
  @IsNotEmpty()
  readonly image_url: string;

  @IsNumber()
  @IsPositive()
  readonly price: number;
}
