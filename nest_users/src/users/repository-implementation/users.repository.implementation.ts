import { CreateUserDto, IUsersRepository } from "core/users/users.repository";
import * as bcrypt from 'bcrypt';
import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { User } from "core/users/users.model";

@Injectable()
export class UsersRepositoryImpl implements IUsersRepository {
    constructor(@InjectModel('user') private readonly userModel: Model<User>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const username = createUserDto.username.toLowerCase();

        const saltOrRounds = 10;
        const password = await bcrypt.hash(createUserDto.password, saltOrRounds);

        const role = createUserDto.role

        const newUser = new this.userModel({
            username,
            password,
            role
        });

        try {
            await newUser.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new NotAcceptableException('Username is already used');
            }
        }
        await newUser.save();

        // @ts-ignore
        delete newUser.password
        return newUser;
    }

    async findOne(username: string): Promise<User> {
        return await this.userModel.findOne({ username: username.toLowerCase() });
    }


}