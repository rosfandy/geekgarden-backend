import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/users.model';
import { LoginUserDto, PostUserDto, PutUserDto } from '../models/users.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User) { }

    async getUsers(): Promise<any> {
        return this.userModel.findAll({
            attributes: ['id', 'name', 'email'],
        });
    }
    async getUserById(id: number): Promise<any> {
        const user = await this.userModel.findByPk(id, {
            attributes: ['id', 'name', 'email'],
        });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async postUser(data: PostUserDto): Promise<any> {
        const user = await this.userModel.create({
            ...data,
            password: await bcrypt.hash(data.password, 10)
        })
        return { id: user.id, name: user.name, email: user.email }
    }

    async putUser(id: number, data: PutUserDto): Promise<any> {
        const user = await this.userModel.findByPk(id);
        if (!user) throw new NotFoundException(`User with ID ${id} not found`);
        await user.update(data)
        return { id: user.id, name: user.name, email: user.email }
    }

    async deleteUser(id: number): Promise<any> {
        const user = await this.userModel.findByPk(id);
        if (!user) throw new NotFoundException(`User with ID ${id} not found`);
        await this.userModel.destroy({
            where: { id }
        })
        return true
    }
}