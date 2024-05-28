import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JobGroupService {
    constructor(private prisma: PrismaService){}
    
    async getAllJobGroup(){
        console.log(this.prisma);
        try {
            const res = await this.prisma.jobGroup.findMany();
            if(res.length > 0 || res){
                return res;
            }else return {status: 400, message: "Not Found"};
        } catch (error) {
            throw new Error(error)
        }
        // return "Running Test";
    }

    async getJobGroupByID(id: string){
        try {
            const res = await this.prisma.jobGroup.findUnique({
                where: {
                    groupID: Number(id),
                },
            });
            if(res){
                return res;
            }else{
                console.log("error: ")
                return({status: 400, message: "Not Found"})
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async getJobGroupByTitle(title: string){
        try {
            const res = await this.prisma.jobGroup.findFirst({
                where: {
                    jobGroupTitle: {
                        contains: title
                    },
                },
            });
            if(res){
                return res;
            }else{
                console.log("error: ")
                return({status: 400, message: "Not Found"})
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async createJobGroup(data: Prisma.JobGroupCreateInput){
        try {
            const res = await this.prisma.jobGroup.create({
                data: {
                    jobGroupTitle: data.jobGroupTitle,
                    Description: data.Description,
                }
            });
            return res;
        } catch (error) {
            console.log("cannot create JobGroup")
            throw new Error(error)
        }
    }

    async updateJobGroup(
        param:{
            data: Prisma.JobGroupUpdateInput
            where: Prisma.JobGroupWhereUniqueInput
        }
    ){
        try {
            const { data, where } = param;
            const res = await this.prisma.jobGroup.update({
                data, where
            });
            return res;
        } catch (error) {
            console.log("Cannot update")
            throw new Error(error)
        }
    }


}