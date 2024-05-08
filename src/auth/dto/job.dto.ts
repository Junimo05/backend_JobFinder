import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class JobDto {
    @IsNumber()
    @IsNotEmpty()
    jobID: number;
    
    @IsNumber()
    groupID      : number;
    
    @IsNumber()
    @IsNotEmpty()
    employerID   : number;      
    
    @IsString()
    @IsNotEmpty()
    JobTitle     :string;

    @IsString()
    @IsNotEmpty()
    Location     :string;

    @IsString()
    @IsNotEmpty()
    Description  :string;

    @IsString()
    @IsNotEmpty()
    Requirements :string;

    @IsNumber()
    @IsNotEmpty()
    Persons      :number;

    @IsString()
    @IsNotEmpty()
    SalaryRange  :string;

    @IsDate()
    @IsNotEmpty()
    CloseDate   :Date;
}