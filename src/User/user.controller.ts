import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { employee, employer, job, Prisma, user } from "@prisma/client";
import { UserService } from "./user.service";
import { AccountDto } from "src/auth/dto/account.dto";
import { MailerService } from "@nestjs-modules/mailer";
import { randomBytes } from "crypto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import Multer from "@nestjs/platform-express"// Import the diskStorage function from multer
import { storageConfig } from "src/helpers/storageConfig";
import { extname, join, resolve } from 'path';
import fs from 'fs';
import { EmployerService } from "src/Employer/employer.service";
import { EmployeeService } from "src/Employee/employee.service";
import { PrismaService } from "src/prisma/prisma.service";
import { changePassDto } from "src/auth/dto/changepass.dto";

@Controller('users')
export class UsersController {
    constructor(
        private prisma: PrismaService,
        private userService: UserService,
        private mailService: MailerService,
    ){}

    @Post('/forgotPassword/:email')
    async forgotPassword(@Param('email') email: string){
        const code = randomBytes(3).toString('hex').toUpperCase();
        let res: employee | employer;
        res = await this.prisma.employee.findUnique({
            where: {
                Email: email,
            },
        });

        if (!res) {
            res = await this.prisma.employer.findUnique({
                where: {
                    Email: email,
                },
            });
        }
        

        if(!res){
            return {message: "Email not found"};
        }

        let user = await this.prisma.user.findUnique({
            where: {
                userID: res.userID,
            },
        });

        await this.mailService.sendMail({
            to: email, // Use the email passed as a parameter
            subject: 'Verification Code',
            template: 'confirmUser',
            context: {
                code: code,
            },
        });

        return {user, code: code};
    }

    @Get('/getall')
    async getAllUser(){
        return this.userService.getAllUsers();
    }

    @Post('upload/:idUser')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
        destination: './public/users',
        filename: async (req, file, cb) => {
            const iduser = req.params.idUser;
            const uniqueSuffix = iduser;
            const ext = extname(file.originalname);
            const filename = `${uniqueSuffix}${ext}`;

            const filePath = join(__dirname, '..', 'public/users');
            console.log("filePath = ", filePath);
            // console.log(filename);
            try {
            // Lấy danh sách các file trong thư mục
            const files = fs.readdir(filePath, (err, files) => {
                if (err) {
                console.error('Error accessing files:', err);
                return;
                }

                // Tìm và xóa các file có tên trùng (không phân biệt phần mở rộng)
                for (const file of files) {
                if (file.startsWith(iduser) && file !== filename) {
                    fs.unlink(join(filePath, file.toString()), (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    }
                    });
                }
                }
            });
            } catch (error) {
            console.error('Error accessing or deleting files:', error);
            }
            cb(null, filename);
        },
        })
    }))
    uploadFile(@Param('idUser') id: string, @UploadedFile() file: Express.Multer.File) {
        console.log("file = ", file, "id = ", id);
        return this.userService.handleFileUpload(id, file.filename);
    }

    @Get('/searchID/:id')
    async getUserByID(@Param('id') id: string){
        return this.userService.getUserByID(id);
    }

    @Get('/searchUsername/:username')
    async getUserByUsername(@Param('username') username: string) {
        return this.userService.getUserByName(username)
    }

    @Post('/create')
    async createUser(
        @Body()
        data: Prisma.userCreateInput
    ):Promise<user>
    {
        return await this.userService.createUser(data)   
    }

    @Post('/create-employee')
    async createWithEmployee(@Body() data: {
        user: Prisma.userCreateInput,
        employee: Prisma.employeeCreateInput,
    }) {
        return this.userService.createUserWithEmployee(data);
    }

    @Post('/create-employer')
    async createWithEmployer(@Body() data: {
        user: Prisma.userCreateInput,
        employer: Prisma.employerCreateInput,
    }) {
        return this.userService.createUserWithEmployer(data);
    }

    @Patch(':id')
    async updateUser(
        @Param('id') id: string,
        @Body()
        dto: AccountDto
    ){
        return await this.userService.updatePasswordUser({
            where: {userID: Number(id)},
            data: dto,
        });
    }

    @Patch('/changePass/:id')
    async changePassword(@Param('id') id: string, @Body() dto: changePassDto) {
        return await this.userService.changePassword(
            {
                where: {userID: Number(id)},
                data: dto,
            }
        );
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<object> {
        return await this.userService.deleteUser(Number(id));
    }

    @Post('/login')
    async login(@Body() data: any) {
        return await this.userService.Login(data);
    }

    
}