import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { employee, Prisma } from "@prisma/client";

@Controller('employees')
export class EmployeeController {
    constructor(private employeeService: EmployeeService){}

    
    @Get('/getall')
    async getAllEmployee(){
        return this.employeeService.getAllEmployees();
    }

    @Get('/searchID/:id')
    async getEmployeeByID(@Param('id') id: string){
        return this.employeeService.getEmployeeByID(id);
    }

    @Get('/searchEmail/:email')
    async getEmployeeByEmail(@Param('email') email: string) {
        return this.employeeService.getEmployeeByEmail(email)
    }

    @Get('/searchPhone/:phone')
    async getEmployeeByPhone(@Param('phone') phone: string) {
        return this.employeeService.getEmployeeByPhone(phone)
    }

    @Patch(':id')
    async updateEmployee(
        @Param('id') id: string,
        @Body()
        dto: Prisma.employeeUpdateInput
    ){
        return await this.employeeService.updateEmployee({
            where: {employeeID: Number(id)},
            data: dto,
        });
    }

    @Delete(':id')
    async deleteEmployee(@Param('id') id: string): Promise<object> {
        return await this.employeeService.deleteEmployee(Number(id));
    }
}