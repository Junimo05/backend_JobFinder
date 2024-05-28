import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { Job, Prisma, User } from "@prisma/client";
import { UserService } from "./user.service";
import { AccountDto } from "src/auth/dto/account.dto";
import { MailerService } from "@nestjs-modules/mailer";
import { randomBytes } from "crypto";

@Controller('users')
export class UsersController {
    constructor(
        private userService: UserService,
        private mailService: MailerService,
    ){}

    @Get('/forgotPassword/:email')
    async forgotPassword(@Param('email') email: string){
        const code = randomBytes(3).toString('hex');

        await this.mailService.sendMail({
            to: email,
            subject: 'Verification Code',
            text: `Your code is ${code}`,
            context: {
                code: code,
            },
        });

        return {code: code};
    }

    @Get('/getall')
    async getAllUser(){
        return this.userService.getAllUsers();
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
        data: Prisma.UserCreateInput
    ):Promise<User>
    {
        return await this.userService.createUser(data)   
    }

    @Post('/create-employee')
    async createWithEmployee(@Body() data: {
        user: Prisma.UserCreateInput,
        employee: Prisma.EmployeeCreateInput,
    }) {
        return this.userService.createUserWithEmployee(data);
    }

    @Post('/create-employer')
    async createWithEmployer(@Body() data: {
        user: Prisma.UserCreateInput,
        employer: Prisma.EmployerCreateInput,
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

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<object> {
        return await this.userService.deleteUser(Number(id));
    }

    @Post('/login')
    async login(@Body() data: any) {
        return await this.userService.Login(data);
    }

    @Post('/register')
    async register(@Body() data: any) {
        return await this.userService.Register(data);
    }
}