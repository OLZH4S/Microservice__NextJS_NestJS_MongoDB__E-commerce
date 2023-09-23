export class Product {
    constructor(
        readonly _id: string,
        readonly ownerId: string,

        readonly name: string,
        readonly description: string,
        readonly pictures: Array<string>,

        readonly price: number,
    ) { }
}