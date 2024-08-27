import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ILogon } from 'src/logon/user.entity';
import { UserService } from 'src/logon/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(logonDetail: ILogon): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(logonDetail.username);
    if (user?.password !== logonDetail.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
