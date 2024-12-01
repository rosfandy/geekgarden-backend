import { Body, Controller, Get, Header, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../service/auth.service';
import { LoginUserDto, PostUserDto } from '../service/auth.dto';

@Controller('/api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Get('/test')
    test(@Res() res: Response) {
        res.cookie('tes', 'test')
        res.send('test');
    }

    @Post('register')
    @Header('Content-Type', 'application/json')
    async register(@Body() data: PostUserDto): Promise<any> {
        try {
            const res = await this.authService.postUser(data);
            return { success: true, data: res };
        } catch (error) {
            throw new HttpException({
                success: false,
                error: error.errors,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('login')
    @Header('Content-Type', 'application/json')
    async login(@Body() data: LoginUserDto, @Res() response: Response): Promise<any> {
        try {
            const { accessToken } = await this.authService.login(data);
            response.cookie('jwt', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000,
            });
            return response.status(200).send({ success: true, token: accessToken });
        } catch (error) {
            throw new HttpException({
                success: false,
                error: error.message,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}