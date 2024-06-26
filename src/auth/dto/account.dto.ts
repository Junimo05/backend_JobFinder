import { IsNotEmpty, IsString } from "class-validator"

export class AccountDto {
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    newPassword: string
}