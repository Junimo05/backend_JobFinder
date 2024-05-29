import { Body, Controller, Get, Param, Patch } from "@nestjs/common";
import { EmployerService } from "./employer.service";
import { Prisma } from "@prisma/client";

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
    @Get('/searchName/:CompanyName')
    async getEmployerByComname(@Param('CompanyName') CompanyName: string){
        return this.employerService.getEmployerByCompany(CompanyName);
    }

    @Get('/searchJobs/:id')
    async getEmployerJobs(@Param('id') id: string){
        return this.employerService.getEmployerJobs(id);
    }

    @Patch(':id')
    async updateEmployer(
        @Param('id') id: string,
        @Body()
        dto: Prisma.employerUpdateInput
    ){
        return await this.employerService.updateEmployer({
            where: {employerID: Number(id)},
            data: dto,
        });
    }
    //@Post
    //@Put
}