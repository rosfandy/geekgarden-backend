import { Module } from '@nestjs/common';
import { ProductsController } from './controller/products.controller';
import { ProductService } from './service/products.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/products.model';
import { User } from 'src/users/models/users.model';
@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    SequelizeModule.forFeature([Product]),
  ],
  controllers: [ProductsController],
  providers: [ProductService],
  exports: [SequelizeModule]
})

export class ProductsModule { }
