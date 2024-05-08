import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserDto {
    @IsNumber()
    @IsNotEmpty()
    userID : number;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}