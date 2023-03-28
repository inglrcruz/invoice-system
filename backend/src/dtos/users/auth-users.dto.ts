import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthUserDto {

  @ApiProperty({ description: '', type: String, required: true })
  @IsString()
  readonly username: string;

  @ApiProperty({ description: '', type: String, required: true })
  @IsString()
  @MinLength(6)
  readonly password: string;

}
