import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}
    
    @HttpCode(200)
    @Post('login')
    signIn(@Body() username: string, @Body() password: string): AuthResponseDto {
        return this.authService.signIn(username, password);
    }
}
