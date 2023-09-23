import { Order } from "./orders.model"

export interface CreateOrderDto extends Omit<Order, '_id'> { }
export interface UpdateOrderDto extends Order { }


export interface IOrdersRepository {
    create(createOrderDto: CreateOrderDto): Promise<Order>

    findAll(creatorId: string): Promise<Array<Order>>

    findOne(_id: string): Promise<Order>

    update(_id: string, updateOrderDto: UpdateOrderDto): Promise<Order>

    remove(_id: string, creatorId: string): Promise<void>
}