import { Controller, Get, Param } from "@nestjs/common";
import { EmployerService } from "./employer.service";

@Controller('employers')
export class EmployerController {
    constructor(private employerService: EmployerService){}

    @Get('/getall')
    async getAllEmployer(){
        return this.employerService.getAllEmployers();
    }
    @Get('/searchID/:id')
    async getEmployerByID(@Param('id') id: string){
        return this.employerService.getEmployerByID(id);
    }
    @Get('/searchName/:com_name')
    async getEmployerByComname(@Param('com_name') com_name: string){
        return this.employerService.getEmployerByCompany(com_name);
    }

    //@Post
    //@Put
}