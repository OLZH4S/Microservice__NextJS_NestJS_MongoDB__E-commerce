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

export class CreateProductDto {
    constructor(

        public name: string,
        public description: string,

        public price: number,
        public pictures: Array<string>,

    ) { }
}
export class UpdateProductDto extends Product { }
export class FindAllDto {
    constructor(
        public limit?: number,
        public offset?: number,
    ) { }

}