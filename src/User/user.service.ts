import { Injectable } from '@nestjs/common';
import { user, Prisma } from '@prisma/client';
import { AccountDto } from 'src/auth/dto/account.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async getAllUsers(){
        try {
            const res = await this.prisma.user.findMany();
            if(res.length > 0 || res){
                return res;
            }else return {status: 400, message: "No User Found"};
        } catch (error) {
            throw new Error(error)
        }
        // return "Running Test";
    }

    async getUserByID(id: string){
        try {
            const res = await this.prisma.user.findUnique({
                where: {
                    userID: Number(id),
                },
            });
            if(res){
                return res;
            }else{
                console.log("error: ")
                return({status: 400, message: "No User Found"})
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async getUserByName(username: string){
        try {
            const res = await this.prisma.user.findUnique({
                where: {
                    username: username,
                },
            });
            if(res){
                return res;
            }else{
                console.log("error: ")
                return({status: 400, message: "No User Found"})
            }
        } catch (error) {
            throw new Error(error)
        }
    }   

    async handleFileUpload(id: string, filename: string) {
        //update image url to db
        try {
            const res = await this.prisma.user.update({
                where: {
                    userID: parseInt(id)
                },
                data: {
                    imgurl: `http://10.0.2.2:8000/users/${filename}`
                }
            });
            if(res) return res;
            else throw new Error('Image not updated');
        }catch(error) {
            throw new Error("Error updating image url");
        }
    }
    
    async createUser(data: Prisma.userCreateInput){
        // let tmp: Prisma.UserCreateInput = data
        try {
            const res = await this.prisma.user.create({data: data});
            return res;
        } catch (error) {
            console.log("cannot create User")
            throw new Error(error)
        }
    }

    async createUserWithEmployee(data: {
        user: Prisma.userCreateInput,
        employee: Prisma.employeeCreateInput,
      }) {
        try {
            const res = await this.prisma.user.create({
                data: {
                  ...data.user,
                  employee: {
                    create: data.employee,
                  },
                },
              });
            return res;
        } catch (error) {
            console.log("cannot create User")
            throw new Error(error)
        }
    }

    async createUserWithEmployer(data: {
        user: Prisma.userCreateInput,
        employer: Prisma.employerCreateInput,
        }) {
        
        try {
            const res = await this.prisma.user.create({
                data: {
                ...data.user,
                employer: {
                    create: data.employer,
                },
                },
            });
            return res;
        } catch (error) {
            console.log("cannot create User")
            throw new Error(error)
        }
    }

    async updatePasswordUser(
        param:{
            data: AccountDto
            where: Prisma.userWhereUniqueInput
        }
    ){
        try {
            const { data, where } = param;
            const user = await this.prisma.user.findFirst({
                where
            });

            if(!user){
                return {msg: "User not found"}
            }

            const oldPass = user.password;

            if(oldPass === data.oldPassword){
                const res = await this.prisma.user.update({
                    data: {
                        password: data.newPassword
                    }, 
                    where
                });
                return res;
            }else {
                return {msg: "Password incorrect"}
            }
        } catch (error) {
            console.log("Cannot update User")
            throw new Error(error)
        }
    }

    async deleteUser(id: number): Promise<object> {
        try {
          await this.prisma.user.delete({ where: { userID: id } });
          return {
            msg: 'User deleted',
          };
        } catch (error) {
          throw new Error(error.message);
        }
    }

    async Login(data: Prisma.userCreateInput) {
        try {
            const res = await this.prisma.user.findFirst({
                where: {
                    username: data.username,
                    password: data.password
                }
            });
            if(res){
                const employee = await this.prisma.employee.findFirst({
                    where: {
                        userID: res.userID
                    }
                });
                const employer = await this.prisma.employer.findFirst({
                    where: {
                        userID: res.userID
                    }
                });
                if(employee){
                    return {...res, role: 'Employee'};
                }
                else if(employer){
                    return {...res, role: 'Employer'};
                }
                else{
                    return {status: 400, message: "User is neither an Employee nor an Employer"};
                }
            }
            else{
                return {status: 400, message: "Username or Password is incorrect"};
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    
}