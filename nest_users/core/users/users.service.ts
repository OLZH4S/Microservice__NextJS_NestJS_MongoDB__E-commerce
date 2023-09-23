import { User } from "./users.model";
import { CreateUserDto, IUsersRepository, UpdateUserDto, } from "./users.repository";

export class UsersService {
    constructor(readonly userRepository: IUsersRepository) { }

    signup(createUserDto: CreateUserDto): Promise<User> {
        return this.userRepository.create(createUserDto)
    }

    findOne(username: string): Promise<User> {
        return this.userRepository.findOne(username)
    }

}