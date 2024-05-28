import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { JobGroupService } from "./jobgroup.service";
import { JobGroup, Prisma } from "@prisma/client";

@Controller('groups')
export class JobGroupController {
    constructor(private jobgroupService: JobGroupService){}

    @Get('/getall')
    async getAllJobGroup(){
        return this.jobgroupService.getAllJobGroup();
    }

    @Get('/searchID/:id')
    async getJobGroupByID(@Param('id') id: string){
        return this.jobgroupService.getJobGroupByID(id);
    }

    @Get('/searchTitle/:title')
    async getJobGroupByTitle(@Param('title') title: string) {
        return this.jobgroupService.getJobGroupByTitle(title)
    }

    @Post()
    async createJobGroup(
        @Body()
        data: Prisma.JobGroupCreateInput
    ):Promise<JobGroup>
    {
        return await this.jobgroupService.createJobGroup(data);   
    }

    @Patch(':id')
    async updateJobGroup(
        @Param('id') id: string,
        @Body()
        dto: Prisma.JobGroupUpdateInput
    ){
        return await this.jobgroupService.updateJobGroup({
            where: {groupID: Number(id)},
            data: dto,
        });
    }
}