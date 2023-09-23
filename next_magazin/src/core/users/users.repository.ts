import { User } from "./users.model";

export interface CreateUserDto extends Omit<User, '_id'> { }
export interface LoginCredentials { username: string, password: string }

export interface IUsersRepository {
    signup(createUserDto: CreateUserDto): Promise<{ data: User | unknown, response: Response }>

    login(loginCredentials: LoginCredentials): Promise<{ data: User | unknown, response: Response }>

    logout(): Promise<{ data: User | unknown, response: Response }>


}