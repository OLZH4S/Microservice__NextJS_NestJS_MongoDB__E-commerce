import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from "@nestjs/mongoose"
import { UserSchema } from './repository-implementation/users.model';
import { UsersRepositoryImpl } from './repository-implementation/users.repository.implementation';


@Module({
    imports: [MongooseModule.forFeature([{ name: "user", schema: UserSchema }])],
    controllers: [UsersController],
    providers: [
        UsersService,
        UsersRepositoryImpl
    ],
    exports: [UsersService],
})
export class UsersModule { }
