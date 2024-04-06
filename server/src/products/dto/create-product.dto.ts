import {IsNumber, IsString} from "class-validator";

export class CreateProductDto {
    @IsString()
    product_name: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsString()
    general_note: string;

    @IsString()
    special_note: string;

    @IsNumber()
    category_id: number;
}
