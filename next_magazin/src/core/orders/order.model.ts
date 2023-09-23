import { Product } from "../products/products.model";

export class Order {
    constructor(
        readonly _id: string,
        readonly creatorId: string,

        readonly product: Product,

    ) { }
}
