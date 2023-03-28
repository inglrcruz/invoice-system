import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import { CreateInvoiceDto } from './create-invoice.dto';

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {

    @ApiProperty({ type: Array, required: false })
    @IsArray()
    @IsOptional()
    readonly itemsDelete?: [];
}
