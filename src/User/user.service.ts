import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
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

    async createUser(data: Prisma.UserCreateInput){
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
        user: Prisma.UserCreateInput,
        employee: Prisma.EmployeeCreateInput,
      }) {
        try {
            const res = await this.prisma.user.create({
                data: {
                  ...data.user,
                  Employee: {
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
        user: Prisma.UserCreateInput,
        employer: Prisma.EmployerCreateInput,
        }) {
        
        try {
            const res = await this.prisma.user.create({
                data: {
                ...data.user,
                Employer: {
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
            where: Prisma.UserWhereUniqueInput
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

    async Login(data: Prisma.UserCreateInput) {
        try {
            const res = await this.prisma.user.findFirst({
                where: {
                    username: data.username,
                    password: data.password
                }
            });
            if(res){
                return res;
            }
            else{
                return {status: 400, message: "No User Found"};
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async Register(data: Prisma.UserCreateInput) {
        try {
            const res = await this.prisma.user.create({data: data});
            return res;
        } catch (error) {
            throw new Error(error);
        }
    }
}