import { User } from "./users.model";

export interface CreateUserDto extends Omit<User, '_id'> { }
export interface UpdateUserDto extends User { }


export interface IUsersRepository {
    create(createUserDto: CreateUserDto): Promise<User>

    findOne(username: string): Promise<User>

 
}