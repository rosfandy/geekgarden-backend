import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Product } from "src/products/models/products.model";

@Table
export class User extends Model<User> {
    @HasMany(() => Product)
    products: Product[];

    @Column
    name: string
    @Column
    email: string
    @Column
    password: string
    @Column({ defaultValue: false })
    isAdmin: boolean
}