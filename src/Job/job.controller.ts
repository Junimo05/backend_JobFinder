import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { JobService } from "./job.service";
import { Job, Prisma } from "@prisma/client";

@Controller('jobs')
export class JobsController {
    constructor(private jobService: JobService){}

    @Get('/getall')
    async getAllJob(){
        return this.jobService.getAllJobs();
    }

    @Get('/searchID/:id')
    async getJobByID(@Param('id') id: string){
        return this.jobService.getJobByID(id);
    }

    @Get('/searchTitle/:title')
    async getJobByTitle(@Param('title') title: string) {
        return this.jobService.SearchJobByTitle(title)
    }

    @Get('searchGroup/:group')
    async getJobByGroup(@Param('group') group: string) {
        return this.jobService.SearchJobByGroup(group)
    }
        
    @Post()
    async createJob(
        @Body()
        jobData: Prisma.JobCreateInput
    ):Promise<Job>
    {
        return await this.jobService.createJob(jobData)   
    }

    @Patch(':id')
    async updateJob(
        @Param('id') id: string,
        @Body()
        dto: Prisma.JobUpdateInput
    ){
        return await this.jobService.updateJob({
            where: {jobID: Number(id)},
            data: dto,
        });
    }

    @Delete(':id')
    async deleteJob(@Param('id') id: string): Promise<object> {
        return await this.jobService.deleteJob(Number(id));
    }
}