import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JobGroupService {
    constructor(private prisma: PrismaService){}
    
    async getAllJobGroup(){
        try {
            const jobgroups = await this.prisma.jobgroup.findMany();
            if(jobgroups.length > 0){
                const result = await Promise.all(jobgroups.map(async (group) => {
                    const jobCount = await this.prisma.jobongroup.count({
                        where: {
                            groupID: group.groupID
                        }
                    });
                    return {...group, jobCount};
                }));
                return result;
            }else {
                return {status: 400, message: "Not Found"};
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async getJobGroupByID(id: string){
        try {
            const res = await this.prisma.jobgroup.findUnique({
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
            const res = await this.prisma.jobgroup.findFirst({
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

    async createJobGroup(data: Prisma.jobgroupCreateInput){
        try {
            const res = await this.prisma.jobgroup.create({
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
            data: Prisma.jobgroupUpdateInput
            where: Prisma.jobgroupWhereUniqueInput
        }
    ){
        try {
            const { data, where } = param;
            const res = await this.prisma.jobgroup.update({
                data, where
            });
            return res;
        } catch (error) {
            console.log("Cannot update")
            throw new Error(error)
        }
    }


}