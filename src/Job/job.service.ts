import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { contains } from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JobService {
    constructor(private prisma: PrismaService){}

    async getAllJobs(){
        try {
            const res = await this.prisma.job.findMany();
            if(res.length > 0 || res){
                return res;
            }else return {status: 400, message: "No Job Found"};
        } catch (error) {
            throw new Error(error)
        }
        // return "Running Test";
    }

    async getJobByID(id: string){
        try {
            const res = await this.prisma.job.findUnique({
                where: {
                    jobID: Number(id),
                },
            });
            if(res){
                return res;
            }else{
                console.log("error: ")
                return({status: 400, message: "No Job Found"})
            }
        } catch (error) {
            throw new Error(error)
        }
    }
    
    async getJobByLocation(location: string){
        try {
            const res = await this.prisma.job.findMany({
                where: {
                    Location:{
                        contains: location
                    },
                },
            });
            if(res){
                return res;
            }else{
                console.log("error: ")
                return({status: 400, message: "No Job Found"})
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async SearchJobByGroup(group: string) {
        try {
            const jobOnGroups = await this.prisma.jobOnGroup.findMany({
                where: {
                    JobGroup: {
                        jobGroupTitle: group
                    }
                },
                include: {
                    Job: true,
                    JobGroup: true,
                }
            });
    
            if(jobOnGroups && jobOnGroups.length > 0){
                const jobs = jobOnGroups.map(jobOnGroup => jobOnGroup.Job);
                return jobs;
            }else{
                console.log("error: No Job Found")
                return({status: 400, message: "No Job Found"})
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async SearchJobByTitle(title: string){
        try {
            const res = await this.prisma.job.findMany({
                where:{
                    JobTitle:{
                        contains: title
                    }
                },
            });
            if(res.length > 0 || res){
                return res;
            }else{
                return {status: 400, message: "No Job Found"}
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async createJob(data: Prisma.JobCreateInput){
        // let tmp: Prisma.JobCreateInput = data
        try {
            const res = await this.prisma.job.create({data: data});
            return res;
        } catch (error) {
            console.log("cannot create Job")
            throw new Error(error)
        }
    }

    async updateJob(
        param:{
            data: Prisma.JobUpdateInput
            where: Prisma.JobWhereUniqueInput
        }
    ){
        try {
            const { data, where } = param;
            const res = await this.prisma.job.update({
                data, where
            });
            return res;
        } catch (error) {
            console.log("Cannot update Job")
            throw new Error(error)
        }
    }

    async deleteJob(id: number): Promise<object> {
        try {
          await this.prisma.job.delete({ where: { jobID: id } });
          return {
            msg: 'Job deleted',
          };
        } catch (error) {
          throw new Error(error.message);
        }
    }

    
}