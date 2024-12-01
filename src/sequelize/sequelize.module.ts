import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'src/products/models/products.model';
import { User } from 'src/users/models/users.model';

@Module({
    imports: [
        ConfigModule.forRoot(),
        SequelizeModule.forRoot({
            dialect: process.env.DB_TYPE as 'mysql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            models: [User, Product],
            autoLoadModels: true,
            synchronize: true,
        }),

    ]
})

export class DatabaseModule { }
