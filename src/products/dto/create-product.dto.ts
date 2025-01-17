import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator"

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    readonly name!: string

    @IsString()
    @IsNotEmpty()
    readonly description!: string

    @IsNumber()
    @IsNotEmpty() 
    readonly price!: number

    @IsString()
    @IsNotEmpty()
    readonly image_url!: string

    @IsString()
    @IsNotEmpty()
    readonly size!: string

    @IsString()
    @IsNotEmpty()
    readonly color!: string

    @IsNumber()
    @IsNotEmpty()
    readonly stock_quantity!: number

    @IsNumber()
    @IsNotEmpty()
    readonly ratings_number!: number

    @IsString()
    @IsNotEmpty()
    readonly code!: string

    @IsString()
    @IsUUID()
    readonly category_id
}
