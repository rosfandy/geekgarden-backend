import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LoginUserDto, PostUserDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/users.model';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
        private jwtService: JwtService
    ) { }

    async postUser(data: PostUserDto): Promise<any> {
        const user = await this.userModel.create({
            ...data,
            password: await bcrypt.hash(data.password, 10)
        })
        return { id: user.id, name: user.name, email: user.email }
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userModel.findOne({ where: { email } });
        if (!user) throw new NotFoundException('User not found');
        if (user && !(await bcrypt.compare(password, user.password)))
            throw new UnauthorizedException('Password incorrect');
        return user;
    }

    async login(data: LoginUserDto): Promise<{ accessToken: string }> {
        const user = await this.validateUser(data.email, data.password);
        if (!user) {
            throw new UnauthorizedException();
        }
        const payload = { email: user.email, id: user.id, isAdmin: user.isAdmin, name: user.name };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}