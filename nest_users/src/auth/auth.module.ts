import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport/dist';
import { SessionSerializer } from './session.serializer';


@Module({
    imports: [UsersModule, PassportModule.register({ session: true })],
    providers: [AuthService, LocalStrategy, SessionSerializer]
})
export class AuthModule { }
