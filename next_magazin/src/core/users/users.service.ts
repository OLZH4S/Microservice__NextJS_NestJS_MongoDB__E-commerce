import { User } from "./users.model";
import { CreateUserDto, IUsersRepository, LoginCredentials } from "./users.repository";

export class UsersService {
    constructor(readonly userRepository: IUsersRepository) { }

    signup(createUserDto: CreateUserDto): Promise<{ data: User | unknown, response: Response }> {
        return this.userRepository.signup(createUserDto)
    }

    login(loginCredentials: LoginCredentials): Promise<{ data: User | unknown, response: Response }> {
        return this.userRepository.login(loginCredentials)
    }

    logout(): Promise<{ data: User | unknown, response: Response }> {
        return this.userRepository.logout()
    }
 

}