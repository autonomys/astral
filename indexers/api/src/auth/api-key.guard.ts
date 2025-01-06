import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ApiKeyGuard extends AuthGuard('api-key') {
  handleRequest<TUser = any>(err: Error, user: TUser): TUser {
    if (err || !user) {
      throw new UnauthorizedException('Invalid API key');
    }
    return user;
  }
}
