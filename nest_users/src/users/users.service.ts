import { Injectable } from '@nestjs/common';
import { UsersService as UsersServiceOnion } from 'core/users/users.service';
import { UsersRepositoryImpl } from './repository-implementation/users.repository.implementation';


@Injectable()
export class UsersService extends UsersServiceOnion {
    constructor(private readonly usersRepositoryImpl: UsersRepositoryImpl) { 
        super(usersRepositoryImpl)
    }
}
