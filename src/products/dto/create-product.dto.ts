import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator"

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    readonly name?: string

    @IsString()
    @IsNotEmpty()
    readonly description?: string

    @IsNumber()
    @IsNotEmpty() 
    readonly price?: number

    @IsString()
    @IsNotEmpty()
    readonly image_url?: string

    @IsNumber({}, { each: true })
    @IsNotEmpty()
    readonly size?: number[]

    @IsString()
    @IsNotEmpty()
    readonly color?: string

    @IsNumber()
    @IsNotEmpty()
    readonly stock_quantity?: number

    @IsNumber()
    @IsNotEmpty()
    readonly ratings_number?: number

    @IsString()
    @IsOptional()
    readonly code: string

    @IsString()
    @IsUUID()
    @IsNotEmpty()
    readonly category_id?: string
}
