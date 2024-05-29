import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class EmployeeService {
    constructor(private prisma: PrismaService){}

    async getAllEmployees(){
        try {
            const res = await this.prisma.employee.findMany();
            if(res.length > 0 || res){
                return res;
            }else return {status: 400, message: "Not Found"};
        } catch (error) {
            throw new Error(error)
        }
    }

    async getEmployeeByID(id: string){
        try {
            const res = await this.prisma.employee.findUnique({
                where: {
                    employeeID: Number(id),
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

    async getEmployeeByPhone(phone: string){
        try {
            const res = await this.prisma.employee.findUnique({
                where: {
                    Phone: phone,
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

    async getEmployeeByEmail(email: string){
        try {
            const res = await this.prisma.employee.findUnique({
                where: {
                    Email: email,
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

    async createEmployee(data: Prisma.employeeCreateInput){
        // let tmp: Prisma.JobCreateInput = data
        try {
            const res = await this.prisma.employee.create({data: data});
            return res;
        } catch (error) {
            console.log("cannot create Employee")
            throw new Error(error)
        }
    }

    async updateEmployee(
        param:{
            data: Prisma.employeeUpdateInput
            where: Prisma.employeeWhereUniqueInput
        }
    ){
        try {
            const { data, where } = param;
            const res = await this.prisma.employee.update({
                data, where
            });
            return res;
        } catch (error) {
            console.log("Cannot update Employee")
            throw new Error(error)
        }
    }

    async deleteEmployee(id: number): Promise<object> {
        try {
          await this.prisma.employee.delete({ where: { employeeID: id } });
          return {
            msg: 'Employee deleted',
          };
        } catch (error) {
          throw new Error(error.message);
        }
    }
}