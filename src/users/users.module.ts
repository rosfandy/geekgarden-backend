import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UserService } from './service/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/users.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        SequelizeModule.forFeature([User]),
    ],
    controllers: [UsersController],
    providers: [UserService],
    exports: [SequelizeModule]
})

export class UserModule { }