export class Order {
    constructor(
        readonly _id: string,
        readonly creatorId: string,

        readonly product: Product,

    ) { }
}


export class Product {
    constructor(
        public _id: string,
        public ownerId: string,

        public name: string,
        public description: string,
        public pictures: Array<string>,

        public price: number,
    ) { }
}