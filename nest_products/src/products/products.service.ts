import { Injectable } from '@nestjs/common';
import { ProductsService as ProductsServiceOnion } from 'core/products/products.service';
import { ProductsRepositoryImpl } from './repository-impl/products.repository.impl';

@Injectable()
export class ProductsService extends ProductsServiceOnion {
    constructor(private productsRepositoryImpl: ProductsRepositoryImpl) {
        super(productsRepositoryImpl)
    }

  
}
