import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
            const jobongroups = await this.prisma.jobongroup.findMany({
                where: {
                    jobgroup: {
                        jobGroupTitle: group
                    }
                },
                include: {
                    job: true,
                    jobgroup: true,
                }
            });
    
            if(jobongroups && jobongroups.length > 0){
                const jobs = jobongroups.map(jobongroup => jobongroup.job);
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

    async createJob(data: Prisma.jobCreateInput){
        // let tmp: Prisma.jobCreateInput = data
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
            data: Prisma.jobUpdateInput
            where: Prisma.jobWhereUniqueInput
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