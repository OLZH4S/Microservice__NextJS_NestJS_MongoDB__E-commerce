import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { MongooseModule } from '@nestjs/mongoose'


@Module({
    imports: [
        OrdersModule,
        MongooseModule.forRoot("mongodb://host.docker.internal:27013")
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
