import { Injectable } from "@nestjs/common";
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

    async createEmployer(data: any){
        try {
            const res = await this.prisma.employer.create({
                data:{
                    ...data,
                },
            });
            if(res){
                return {status: 200, message: "Successful"}
            }else{
                return {message: "Error"}
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateEmployer(data: any){
        try {
            const res = await this.prisma.employer.update({
                where:{
                    employerID: Number(data.employerID)
                },
                data:{
                    ...data,
                },
            });
            if(res){
                return {status: 200, message: "Successful"}
            }else{
                return {message: "Error"}
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}