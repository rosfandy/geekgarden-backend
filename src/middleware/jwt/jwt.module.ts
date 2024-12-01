import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { JwtMiddleware } from './jwt.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'defaultSecret',
        }),
    ],
})

export class JwtMiddlewareModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(JwtMiddleware).forRoutes(
            {
                path: '/api/users',
                method: RequestMethod.ALL,
            },
            {
                path: '/api/products',
                method: RequestMethod.ALL,
            },
        )
    }
}
