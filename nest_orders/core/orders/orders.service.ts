import { Order } from "./orders.model";
import { CreateOrderDto, IOrdersRepository, UpdateOrderDto } from "./orders.repository";

export class OrdersService {
    constructor(private OrdersRepository: IOrdersRepository) { }

    create(createOrderDto: CreateOrderDto): Promise<Order> {
        return this.OrdersRepository.create(createOrderDto)
    }

    findAll(creatorId: string): Promise<Array<Order>> {
        return this.OrdersRepository.findAll(creatorId)
    }

    findOne(_id: string): Promise<Order> {
        return this.OrdersRepository.findOne(_id)
    }

    update(_id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
        return this.OrdersRepository.update(_id, updateOrderDto)
    }

    remove(_id: string, creatorId: string): Promise<void> {
        return this.OrdersRepository.remove(_id, creatorId)
    }
}