import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { StatusFormat } from '../../enums/invoices';

class ItemDto {

    @ApiProperty({ type: Number, required: false })
    @IsNumber()
    @IsOptional()
    itmId?: number;

    @ApiProperty({ type: String, required: true })
    @IsString()
    description: string;

    @ApiProperty({ type: Number, required: true })
    @IsNumber()
    qty: number;

    @ApiProperty({ type: Number, required: true })
    @IsNumber()
    price: number;

    @ApiProperty({ type: Number, required: true })
    @IsNumber()
    total: number;
}

export class CreateInvoiceDto {

    @ApiProperty({ description: '', type: Number, required: true })
    @IsNumber()
    readonly cusId: any;

    @ApiProperty({ description: '', type: Number, required: true })
    @IsNumber()
    readonly subTotal: number;

    @ApiProperty({ description: '', type: Number, required: true })
    @IsNumber()
    readonly itbis: number;

    @ApiProperty({ description: '', type: Number, required: true })
    @IsNumber()
    readonly total: number;

    @ApiProperty({ description: '', type: String, required: false })
    @IsOptional()
    @IsString()
    readonly note: string;

    @ApiProperty({ description: '', enum: StatusFormat, required: false })
    @IsOptional()
    @IsEnum(StatusFormat, { each: true })
    readonly status?: StatusFormat

    @ApiProperty({ type: [ItemDto], required: true })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItemDto)
    readonly items: ItemDto[];
}