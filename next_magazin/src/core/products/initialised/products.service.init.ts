
import { ProductsService } from "../products.service";
import { ProductsRepositoryImpl } from "./products.repository.impl";

export const ProductServiceInit = new ProductsService(new ProductsRepositoryImpl())