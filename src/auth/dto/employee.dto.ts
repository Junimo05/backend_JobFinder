import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EmployeeDto {
    @IsNumber()
    @IsNotEmpty()
    employeeID    :number;

    @IsNumber()
    @IsNotEmpty()
    userID        :number;     

    @IsString()
    @IsNotEmpty()
    name          :string;

    @IsNumber()
    @IsNotEmpty()
    age           :number;     

    @IsString()
    Phone         :string;      

    @IsString()
    @IsNotEmpty()
    Email         :string;

    @IsString()
    AboutMe       :string;
    
    @IsString()
    Hobbies       :string;
}