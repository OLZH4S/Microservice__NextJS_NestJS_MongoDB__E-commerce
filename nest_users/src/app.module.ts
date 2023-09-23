import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { KindaApiGatewayModule } from './kinda-api-gateway/kinda-api-gateway.module';

@Module({
    imports: [
        UsersModule,
        MongooseModule.forRoot(
            "mongodb://host.docker.internal:27011"
        ),
        AuthModule,
        KindaApiGatewayModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
