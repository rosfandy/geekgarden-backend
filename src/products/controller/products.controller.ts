import { Body, Controller, Delete, Get, Header, HttpException, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ProductService } from '../service/products.service';
import { PostProductDto, PutProductDto } from '../models/products.dto';
import { RolesGuard } from 'src/guard/roles/roles.guard';

@Controller('/api/products')
export class ProductsController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    @Header('Content-Type', 'application/json')
    @UseGuards(RolesGuard)
    async get(): Promise<any> {
        try {
            const data = await this.productService.getProducts()
            return { success: true, data }
        } catch (error) {
            throw new HttpException({
                success: false,
                error: error,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    @Header('Content-Type', 'application/json')
    async getById(@Param('id') id: number): Promise<any> {
        try {
            const data = await this.productService.getProductById(id)
            return { success: true, data }
        } catch (error) {
            throw new HttpException({
                success: false,
                error: error.response.message,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/owner/:userId')
    @Header('Content-Type', 'application/json')
    async getByOwner(@Param('userId') userId: number): Promise<any> {
        try {
            const data = await this.productService.getProductByOwner(userId)
            return { success: true, data }
        } catch (error) {
            throw new HttpException({
                success: false,
                error: error.response.message,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    @Header('Content-Type', 'application/json')
    async post(@Req() req: any, @Body() data: PostProductDto): Promise<any> {
        try {
            const userId = req.user.id
            console.log(userId)
            const res = await this.productService.postProduct(data, userId)
            return { success: true, data: res }
        } catch (error) {
            throw new HttpException({
                success: false,
                error: error.errors,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    @Header('Content-Type', 'application/json')
    async put(@Param('id') id: number, @Body() data: PutProductDto): Promise<any> {
        try {
            const res = await this.productService.putProduct(id, data)
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
            const isDeleted = await this.productService.deleteProduct(id)
            if (isDeleted) return ({
                success: true,
                message: 'Product Successfully Deleted!'
            })
        } catch (error) {
            throw new HttpException({
                success: false,
                error: error.response.message
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
