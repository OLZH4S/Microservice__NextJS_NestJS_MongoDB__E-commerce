import { Module } from '@nestjs/common';
import { KindaApiGatewayController } from './kinda-api-gateway.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'PRODUCTS_SERVICE',
                transport: Transport.TCP,
                options: {
                    host: 'host.docker.internal',
                    port: 8822
                }
            },
        ]),
        ClientsModule.register([
            {
                name: 'ORDERS_SERVICE',
                transport: Transport.TCP,
                options: {
                    host: 'host.docker.internal',
                    port: 8832
                }
            },
        ]),
    ],
    controllers: [KindaApiGatewayController],
})
export class KindaApiGatewayModule { }
