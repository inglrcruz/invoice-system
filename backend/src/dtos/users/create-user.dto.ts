import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({ type: String, required: true })
    @IsString({ message: "The name is required type string" })
    readonly name: string;

    @ApiProperty({ type: String, required: true })
    @IsString({ message: "The username is required type string" })
    readonly username: string;

    @ApiProperty({ type: String, required: true })
    @IsString()
    @MinLength(6)
    readonly password: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ description: '', type: Boolean, required: false, default: true })
    readonly isActive?: boolean;

}