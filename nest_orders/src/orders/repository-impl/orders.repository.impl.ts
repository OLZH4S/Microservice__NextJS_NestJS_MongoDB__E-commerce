import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Order } from "core/orders/orders.model";
import { CreateOrderDto, IOrdersRepository, UpdateOrderDto } from "core/orders/orders.repository";
import { Model } from "mongoose";

@Injectable()
export class OrdersRepositoryImpl implements IOrdersRepository {
    constructor(@InjectModel('order') private readonly OrderModel: Model<Order>) { }

    create(createOrderDto: CreateOrderDto): Promise<Order> {
        const createdOrder = new this.OrderModel(createOrderDto);
        return createdOrder.save();
    }

    findAll(creatorId: string): Promise<Array<Order>> {
        return this.OrderModel
            .find()
            .where('creatorId').equals(creatorId)
            .exec();
    }

    findOne(_id: string): Promise<Order> {
        return this.OrderModel.findById(_id).exec();
    }

    update(_id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
        return this.OrderModel.findByIdAndUpdate(_id, updateOrderDto, { new: true }).exec();
    }

    remove(_id: string, creatorId: string): Promise<void> {
        // @ts-ignore
        return this.OrderModel
            .findByIdAndRemove(_id)
            .where('creatorId').equals(creatorId)
            .exec();
    }
}