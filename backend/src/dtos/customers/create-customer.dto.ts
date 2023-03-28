import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {

    @ApiProperty({ description: '', type: String, required: true })
    @IsString({ message: "The name is required type string" })
    readonly name: string;

    @ApiProperty({ description: '', type: String, required: true })
    @IsString({ message: "The phone is required type string" })
    readonly phone: string;

    @ApiProperty({ description: '', type: String, required: true })
    @IsString({ message: "The email is required type string" })
    @IsEmail()
    readonly email: string;

    @ApiProperty({ description: '', type: String, required: true })
    @IsString({ message: "The address 1 is required type string" })
    readonly address1: string;

    @ApiProperty({ description: '', type: String, required: true })
    @IsString({ message: "The address 2 is required type string" })
    @IsOptional()
    readonly address2: string;

    @ApiProperty({ description: '', type: String, required: true })
    @IsString({ message: "The city is required type string" })
    readonly city: string;

    @ApiProperty({ description: '', type: String, required: true })
    @IsString({ message: "The state is required type string" })
    readonly state: string;

    @ApiProperty({ description: '', type: Number, required: true })
    @IsNumber()
    readonly zip: number;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ description: '', type: Boolean, required: false, default: true })
    readonly isActive?: boolean;
}