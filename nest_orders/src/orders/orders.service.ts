import { Injectable } from '@nestjs/common';
import { OrdersRepositoryImpl } from './repository-impl/orders.repository.impl';
import { OrdersService as OrdersServiceOnion } from 'core/orders/orders.service';

@Injectable()
export class OrdersService extends OrdersServiceOnion {
    constructor(private ordersRepositoryImpl: OrdersRepositoryImpl) {
        super(ordersRepositoryImpl)
    }
}
