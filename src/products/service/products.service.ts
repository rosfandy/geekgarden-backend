import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../models/products.model';
import { InjectModel } from '@nestjs/sequelize';
import { PostProductDto, PutProductDto } from '../models/products.dto';
import { User } from 'src/users/models/users.model';
import { where } from 'sequelize';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product)
        private readonly productModel: typeof Product
    ) { }

    async getProducts() {
        return this.productModel.findAll({
            attributes: ['id', 'name', 'desc', 'stock'],
            include: [{
                model: User,
                attributes: ['name'],
            }]
        });
    }

    async getProductById(id: number) {
        const product = await this.productModel.findByPk(id, {
            include: [{
                model: User,
                attributes: ['name'],
            }]
        });
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }

    async getProductByOwner(userId: number) {
        const products = await this.productModel.findAll({
            where: { user_id: userId }
        });
        return products;
    }

    async postProduct(data: PostProductDto, userId: number): Promise<any> {
        const product = await this.productModel.create({
            ...data,
            user_id: userId
        })
        return { id: product.id, name: product.name }
    }

    async putProduct(id: number, data: PutProductDto): Promise<any> {
        const user = await this.productModel.findByPk(id);
        if (!user) throw new NotFoundException(`Product with ID ${id} not found`);
        await user.update(data)
        return { id: user.id, name: user.name, desc: user.desc, stock: user.stock }
    }

    async deleteProduct(id: number): Promise<any> {
        const user = await this.productModel.findByPk(id);
        if (!user) throw new NotFoundException(`Product with ID ${id} not found`);
        await this.productModel.destroy({
            where: { id }
        })
        return true
    }

}
