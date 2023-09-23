
import { UsersService } from "../users.service";
import { UserRepositoryImpl } from "./users.repository.impl";

export const UserServiceInit = new UsersService(new UserRepositoryImpl())