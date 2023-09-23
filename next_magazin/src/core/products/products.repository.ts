import { Product } from "./products.model";

export interface CreateProductDto extends Omit<Product, '_id'> { }
export interface UpdateProductDto extends Product { }
export interface FindAllDto {
    limit?: number,
    offset?: number,
}


export interface IProductsRepository {
    create(formData: FormData): Promise<{ data: Product | unknown, response: Response }>



    update(formData: FormData): Promise<{ data: Product | unknown, response: Response }>

    remove(_id: string): Promise<void>
}