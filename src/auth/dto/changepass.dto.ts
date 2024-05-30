import { IsNotEmpty, IsString } from "class-validator"

export class changePassDto {
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    oldPassword: string

    @IsString()
    @IsNotEmpty()
    newPassword: string
}