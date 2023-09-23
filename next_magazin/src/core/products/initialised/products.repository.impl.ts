
import { Product } from "../products.model";
import {  IProductsRepository } from "../products.repository";
import { create, remove, update } from "./api";

export class ProductsRepositoryImpl implements IProductsRepository {
    create(formData: FormData): Promise<{ data: Product | unknown, response: Response }> {
        return create(formData)
    }



    update(formData: FormData): Promise<{ data: Product | unknown, response: Response }> {
        return update(formData)
    }

    remove(_id: string): Promise<void> {
        return remove(_id)
    }
}