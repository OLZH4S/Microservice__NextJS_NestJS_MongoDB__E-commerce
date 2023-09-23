
import { User } from "../users.model";
import { CreateUserDto, IUsersRepository, LoginCredentials } from "../users.repository";
import { login, logout, signup } from "./api";

export class UserRepositoryImpl implements IUsersRepository {
    signup(createUserDto: CreateUserDto): Promise<{ data: User | unknown, response: Response }> {
        return signup(createUserDto)
    }

    login(loginCredentials: LoginCredentials): Promise<{ data: User | unknown, response: Response }> {
        return login(loginCredentials)
    }

    logout(): Promise<{ data: User | unknown, response: Response }> {
        return logout()
    }



}