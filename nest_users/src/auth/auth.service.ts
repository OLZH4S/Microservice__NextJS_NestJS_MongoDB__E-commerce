import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) { }
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (!user) {
            throw new NotAcceptableException('Incorrect username or password');
        }

        const passwordValid = await bcrypt.compare(password, user.password)
        if (!passwordValid) {
            throw new NotAcceptableException('Incorrect username or password');
        }

        if (user && passwordValid) {
            // @ts-ignore
            delete user._doc.password
            return user
        }
    }
}