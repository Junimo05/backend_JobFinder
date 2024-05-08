import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ApplicationDto {
    @IsNumber()
    @IsNotEmpty()
    appID          :number;    

    @IsNumber()
    @IsNotEmpty()
    employeeID     :number;

    @IsNumber()
    @IsNotEmpty()
    jobID          :number;

    @IsString()
    @IsNotEmpty()
    Description    :string;

    @IsString()
    @IsNotEmpty()
    Status         :string;   
}