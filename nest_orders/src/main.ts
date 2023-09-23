import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: 8832,
        },
    });

    await app.startAllMicroservices();
    await app.listen(8831, '0.0.0.0');
    console.log('Orders app waiting at', await app.getUrl())
}
bootstrap();
