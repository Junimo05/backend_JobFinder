import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApplicationService } from "./application.service";
import { application, employee, Prisma } from "@prisma/client";

@Controller('applications')
export class ApplicationController {
    constructor(private appService: ApplicationService){}
    @Get('/getall')
    async getAllApplication(){
        return this.appService.getAllApplications();
    }
    @Get('/searchID/:id')
    async getAppByAppID(@Param('id') id: string){
        return this.appService.getApplicationByID(id);
    }
    @Get('/searchUserID/:id')
    async getAppByUserID(@Param('id') id: string){
        return this.appService.getApplicationByUserID(id);
    }

    @Post()
    async createApplication(
        @Body()
        data: Prisma.applicationCreateInput
    ):Promise<application>
    {
        return await this.appService.createApplication(data)
    }

    @Patch(':id')
    async updateAplication(
        @Param('id') id: string,
        @Body()
        dto: Prisma.applicationUpdateInput
    ){
        return await this.appService.updateApplication({
            where: {appID: Number(id)},
            data: dto,
        });
    }

    @Delete(':id')
    async deleteApplication(@Param('id') id: string): Promise<object> {
        return await this.appService.deleteApplication(Number(id));
    }

}