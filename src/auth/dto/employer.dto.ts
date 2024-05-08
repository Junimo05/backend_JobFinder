import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class EmployerDto {
    @IsNumber()
    @IsNotEmpty()
    employerID    :number;

    @IsNumber()
    @IsNotEmpty()
    userID        :number;
    
    @IsString()
    @IsNotEmpty()
    CompanyName   :string;

    @IsString()
    @IsNotEmpty()
    Industry      :string;

    @IsString()
    @IsNotEmpty()
    Email         :string;

    @IsString()
    @IsNotEmpty()
    Phone         :string;
}