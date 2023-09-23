import { Product } from "./products.model";

export class Order {
    constructor(
        readonly _id: string,
        readonly creatorId: string,

        readonly product: Product,

    ) { }
}


export interface CreateOrderDto extends Omit<Order, '_id' | 'creatorId'> { }
export interface UpdateOrderDto extends Omit<Order, 'creatorId'> { }