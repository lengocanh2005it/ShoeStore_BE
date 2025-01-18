import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name?: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  readonly image_url: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayNotEmpty()
  readonly sizes: number[];

  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  readonly colors: string[];

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock_quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly ratings_number: number;

  @IsString()
  @IsOptional()
  readonly code: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  readonly category_id: string;
}
