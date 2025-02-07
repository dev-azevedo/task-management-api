import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() user: UserDto) {
        this.usersService.create(user);
    }

    @Get()
    getAll() {
        return this.usersService.getAll();
    }
}
