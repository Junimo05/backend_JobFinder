import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class JobGroupDto {
    @IsNumber()
    @IsNotEmpty()
    groupID       :number;   

    @IsString()
    @IsNotEmpty()
    jobGroupTitle :string;

    @IsString()
    @IsNotEmpty()
    Description   :string;
}