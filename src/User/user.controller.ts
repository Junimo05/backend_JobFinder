import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { Job, Prisma, User } from "@prisma/client";
import { UserService } from "./user.service";
import { AccountDto } from "src/auth/dto/account.dto";

@Controller('users')
export class UsersController {
    constructor(private userService: UserService){}

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

    @Post()
    async createUser(
        @Body()
        data: Prisma.UserCreateInput
    ):Promise<User>
    {
        return await this.userService.createUser(data)   
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
}