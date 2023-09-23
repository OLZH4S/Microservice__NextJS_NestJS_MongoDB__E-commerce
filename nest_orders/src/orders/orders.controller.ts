import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'core/orders/orders.repository';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }


    @MessagePattern('findAllOrdersOfBuyer')
    findAllOrdersOfBuyer(@Payload() creatorId: string) {
        return this.ordersService.findAll(creatorId);
    }

    @MessagePattern('createOrder')
    create(@Payload() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }


    @MessagePattern('removeOrder')
    remove(@Payload() payload: { _id: string, creatorId: string }) {
        return this.ordersService.remove(payload._id, payload.creatorId);
    }


}
