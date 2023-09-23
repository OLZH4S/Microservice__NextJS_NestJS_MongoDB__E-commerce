import { Product } from "./products.model";
import { IProductsRepository } from "./products.repository";

export class ProductsService {
    constructor(private productsRepository: IProductsRepository) { }

    create(formData: FormData): Promise<{ data: Product | unknown, response: Response }> {
        return this.productsRepository.create(formData)
    }


    update(formData: FormData): Promise<{ data: Product | unknown, response: Response }> {
        return this.productsRepository.update(formData)
    }

    remove(_id: string): Promise<void> {
        return this.productsRepository.remove(_id)
    }
}