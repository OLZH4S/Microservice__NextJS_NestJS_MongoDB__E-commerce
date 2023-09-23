import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'core/users/users.repository';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ApiTags, ApiBody, ApiCookieAuth } from '@nestjs/swagger';


@ApiTags('User')
@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                username: { type: 'string' },
                password: { type: 'string' },
                role: { type: 'string' },
                address: { type: 'string', nullable: true },
            },
            required: ['username', 'password', 'role'],
        },
    })
    @Post('/signup')
    async signup(@Body() createUserDto: CreateUserDto) {
        return this.usersService.signup(createUserDto);
    }

    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                username: { type: 'string' },
                password: { type: 'string', format: 'password' },
            },
            required: ['username', 'password'],
        },
    })
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    login(@Request() req): any {
        return req.user;
    }

    @ApiCookieAuth('session')
    @UseGuards(AuthenticatedGuard)
    @Get('/checkUser')
    checkUser(@Request() req): string {
        return req.user;
    }


    @ApiCookieAuth('session')
    @UseGuards(AuthenticatedGuard)
    @Get('/logout')
    logout(@Request() req): any {
        req.session.destroy();
        return 'Logged out successfully'
    }



}
