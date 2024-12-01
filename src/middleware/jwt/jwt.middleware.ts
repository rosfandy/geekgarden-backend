import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) { }
  async use(req: any, res: any, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) throw new UnauthorizedException('No token provided!');
    try {
      const decode = this.jwtService.decode(token);
      req.user = decode;
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid Token!')
    }
  }
}
