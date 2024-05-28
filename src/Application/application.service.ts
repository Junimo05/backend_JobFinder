import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ApplicationService{
    constructor(private prisma: PrismaService){}
    async getAllApplications(){
        try {
            const res = await this.prisma.application.findMany();
            if(res.length > 0 || res ){
                return res;
            }else return {status: 400, message: "No Application Found"}
        } catch (error) {
            throw new Error(error)
            
        }
    }

    async getApplicationByID(id: string){
        try {
            const res = await this.prisma.application.findUnique({
                where: {
                    appID: Number(id),
                },
            });
            if(res){
                return res;
            }else{
                console.log("error: ")
                return({status: 400, message: "No Application Found"})
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async getApplicationByUserID(id: string){
        try {
            const res = await this.prisma.application.findMany({
                where: {
                    employeeID: Number(id)
                },
            });
            if(res){
                return res;
            }else{
                console.log("error: ")
                return({status: 400, message: "No Application Found"})
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async createApplication(data: Prisma.ApplicationCreateInput){
        try {
            const res = await this.prisma.application.create({
                data: data
            });
            return res;
        } catch (error) {
            console.log("cannot create Application")
            throw new Error(error)
        }
    }
    
    async updateApplication(
        param:{
            data: Prisma.ApplicationUpdateInput
            where: Prisma.ApplicationWhereUniqueInput
        }
    ){
        try {
            const { data, where } = param;
            const res = await this.prisma.application.update({
                data, where
            });
            return res;
        } catch (error) {
            console.log("Cannot update Application")
            throw new Error(error)
        }
    }

    async deleteApplication(id: number){
        try {
            const res = await this.prisma.application.delete({
                where: {
                    appID: Number(id)
                }
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