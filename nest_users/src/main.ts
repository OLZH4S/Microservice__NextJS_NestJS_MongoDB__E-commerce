import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { GlobalExceptionFilter } from './global-exception.filter';
import * as session from 'express-session';
import * as passport from 'passport'
import RedisStore from "connect-redis"
import Redis from 'ioredis'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';



const redisClient = new Redis(6379, "host.docker.internal")
redisClient.connect().catch(console.error)







async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: 8812,
        }, 
    });

    app.use(
        session({
            store: new RedisStore({ client: redisClient, prefix: "myapp:Users" }),
            saveUninitialized: false,
            resave: false,
            secret: 'very-strong-secret',
            cookie: {
                httpOnly: true,
                maxAge: 1000 * 24 * 60 * 60 * 1000,
                sameSite: true,
            },

        })
    )
    app.use(passport.initialize())
    app.use(passport.session())


    const config = new DocumentBuilder()
        .setTitle('Users Microservice')
        .setDescription('This micro manages users, auth and hence acts like kinda api gateway')
        .setVersion('1.0')
        .addTag('Enpoints')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);


   
    await app.startAllMicroservices();
    await app.listen(8811, '0.0.0.0');
    console.log('Users app waiting at', await app.getUrl())
}
bootstrap();
