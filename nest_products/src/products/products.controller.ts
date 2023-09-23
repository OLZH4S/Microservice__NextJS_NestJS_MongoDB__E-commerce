import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, FindAllDto, FindAllDtoWithSearch, UpdateProductDto } from 'core/products/products.repository';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    findAll(@Query() findAllDtoWithSearch: FindAllDtoWithSearch  ) {
        return this.productsService.findAll(findAllDtoWithSearch);
    }


    @MessagePattern('findAllProductsOfSeller')
    findAllProductsOfSeller(@Payload() payload: { ownerId: string, findAllDto: FindAllDto }) {
        return this.productsService.findAllSeller(payload.ownerId, payload.findAllDto);
    }

    @MessagePattern('findOneProduct')
    findOne(@Payload() payload: { _id: string, ownerId: string }) {
        return this.productsService.findOne(payload._id, payload.ownerId);
    }

    @MessagePattern('createProduct')
    create(@Payload() payload: { body: CreateProductDto, pictures: Express.Multer.File[] }) {
        return this.productsService.create(payload.body, payload.pictures);
    }

    @MessagePattern('updateProduct')
    update(@Payload() payload: { body: UpdateProductDto, pictures: Express.Multer.File[] }) {
        return this.productsService.update(payload.body, payload.pictures);
    }

    @MessagePattern('removeProduct')
    remove(@Payload() payload: { _id: string, ownerId: string }) {
        return this.productsService.remove(payload._id, payload.ownerId);
    }

   

}
