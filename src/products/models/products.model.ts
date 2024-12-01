import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/models/users.model";

@Table
export class Product extends Model<Product> {
    @BelongsTo(() => User, { as: 'owner' })
    user: User;

    @Column
    name: string
    @ForeignKey(() => User)
    @Column
    user_id: number
    @Column
    desc: string
    @Column
    stock: number
}