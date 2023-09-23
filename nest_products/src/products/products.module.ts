import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { ProductSchema } from './repository-impl/products.model';
import { ProductsRepositoryImpl } from './repository-impl/products.repository.impl';

@Module({
    imports: [MongooseModule.forFeature([{ name: "product", schema: ProductSchema }])],
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRepositoryImpl]
})
export class ProductsModule { }
