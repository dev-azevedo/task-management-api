import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import {v4 as uuid} from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { get } from 'http';

@Injectable()
export class UsersService {
    private readonly users: UserDto[] = [
        {
            id: '1',
            username: 'admin',
            password: 'admin'
        },
    ];

    create(newUser: UserDto) {
        newUser.id = uuid();
        newUser.password = bcryptHashSync(newUser.password, 10);
        this.users.push(newUser);
        console.log(newUser);
    }

    getAll(): UserDto[] {
        return this.users;
    }

    findByUsername(username: string): UserDto  | null {
        return this.users.find(user => user.username == username) || null;
    }
}
