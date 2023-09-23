import { Product } from "./products.model";

export interface CreateProductDto extends Omit<Product, '_id' | 'pictures'> { }
export interface UpdateProductDto extends Product { }
export interface FindAllDto {
    limit?: number,
    offset?: number,
}
export interface FindAllDtoWithSearch extends FindAllDto {
    search?: string
}


export interface IProductsRepository {
    create(createProductDto: CreateProductDto): Promise<Product>

    findAll(findAllDtoWithSearch?: FindAllDtoWithSearch): Promise<{ data: Array<Product>, count: number }>

    findAllSeller(ownerId: string, findAllDto?: FindAllDto): Promise<{ data: Array<Product>, count: number }>

    findOne(_id: string, ownerId: string): Promise<Product>

    update(updateProductDto: UpdateProductDto): Promise<Product>

    remove(_id: string, ownerId: string): Promise<void>
}