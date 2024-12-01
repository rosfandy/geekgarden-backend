import { RolesGuard } from 'src/guard/roles/roles.guard';
import { PostUserDto, PutUserDto } from '../models/users.dto';
import { UserService } from '../service/users.service';
import { Controller, Get, Param, Header, NotFoundException, HttpException, HttpStatus, Post, Body, UseGuards, Put, Delete } from '@nestjs/common';

@Controller('/api/users')
export class UsersController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @Header('Content-Type', 'application/json')
    @UseGuards(RolesGuard)
    async get(): Promise<any> {
        try {
            const users = await this.userService.getUsers();
            return { success: true, data: users };
        } catch (error) {
            throw new HttpException({
                success: false,
                error: error.errors.map((err) => ({
                    message: err.message
                })),
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    @Header('Content-Type', 'application/json')
    async getById(@Param('id') id: number): Promise<any> {
        try {
            const user = await this.userService.getUserById(id);
            return { success: true, data: user };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new HttpException({
                    success: false,
                    error: error.message,
                }, HttpStatus.NOT_FOUND);
            }
            throw new HttpException({
                success: false,
                error: error.errors.map((err) => ({
                    message: err.message
                })),
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    @Header('Content-Type', 'application/json')
    async put(@Param('id') id: number, @Body() data: PutUserDto): Promise<any> {
        try {
            const res = await this.userService.putUser(id, data)
            return { success: true, data: res }
        } catch (error) {
            console.error(error)
            throw new HttpException({
                success: false,
                error: error.response.message
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    @Header('Content-Type', 'application/json')
    async delete(@Param('id') id: number) {
        try {
            const isDeleted = await this.userService.deleteUser(id)
            if (isDeleted) return ({
                success: true,
                message: 'User Successfully Deleted!'
            })
        } catch (error) {
            throw new HttpException({
                success: false,
                error: error.response.message
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}   