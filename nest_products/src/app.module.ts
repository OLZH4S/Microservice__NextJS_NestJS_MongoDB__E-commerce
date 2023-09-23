import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose'


@Module({
    imports: [
        ProductsModule,
        MongooseModule.forRoot("mongodb://host.docker.internal:27012"),

    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
