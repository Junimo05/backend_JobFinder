import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class EmployerService {
    constructor(private prisma: PrismaService){}

    async getAllEmployers(){
        try {
            const res = await this.prisma.employer.findMany();
            if(res.length > 0 || res){
                return res;
            }else return {status: 400, message: "No Employer Found"};
        } catch (error) {
            throw new Error(error)
        }
    }

    async getEmployerByID(id: string){
        try {
            const res = await this.prisma.employer.findUnique({
                where: {
                    employerID: Number(id),
                },
            });
            if(res){
                return res;
            }else{
                console.log("error: ")
                return({status: 400, message: "No Employer Found"})
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async getEmployerByCompany(com_name: string){
        try {
            const res = await this.prisma.employer.findMany({
                where: {
                    CompanyName: {
                        contains: com_name
                    }
                },
            });
            if(res){
                return res;
            }else{
                console.log("error: ")
                return({status: 400, message: "No Employer Found"})
            }
        } catch (error) {
            throw new Error(error)
        }

    }

    async getEmployerJobs(id: string){
        try {
            const res = await this.prisma.job.findMany({
                where: {
                    employerID: Number(id),
                },
            });
            if(res){
                return res;
            }else{
                console.log("error: ")
                return({status: 400, message: "No Employer Found"})
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateEmployer(param:{
        data: Prisma.employerUpdateInput,
        where: Prisma.employerWhereUniqueInput,
    }){
        try {
            const res = await this.prisma.employer.update({
                data: param.data,
                where: param.where,
            });
            return res;
        } catch (error) {
            throw new Error(error)
        }
    }
}