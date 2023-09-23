import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderSchema } from './repository-impl/orders.model';
import { MongooseModule } from '@nestjs/mongoose'
import { OrdersRepositoryImpl } from './repository-impl/orders.repository.impl';

@Module({
    imports: [MongooseModule.forFeature([{ name: "order", schema: OrderSchema }])],
    controllers: [OrdersController],
    providers: [OrdersService, OrdersRepositoryImpl],
})
export class OrdersModule { }
