import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import session from 'express-session';
import { User } from '../logon/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<Request & { session: session.Session & { user: User } }>();
    return !!request.session.user;
  }
}
