import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  private jwtSecret: string;
  constructor(private readonly JwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET') || "";
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> 
  {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFormat(request);


    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.JwtService.verifyAsync(token, {secret: this.jwtSecret});

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFormat(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []; 
    return type === 'Bearer' && token ? token : undefined;
  }
}
