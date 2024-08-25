import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LogonService } from './logon.service';
import { ILogon, User } from './user.entity';
import session from 'express-session';
import { AuthGuard } from '../guards/authGuard';

@Controller('logon')
export class LogonController {
  constructor(private readonly logonService: LogonService) {}

  @Post()
  async login(
    @Body() login: ILogon,
    @Req()
    req: Request & {
      session: session.Session & { user: User };
    },
  ): Promise<User> {
    if (login.username && login.password) {
      const user = await this.logonService.login(login); // search user in db
      if (!user)
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

      req.session.user = user;
      return user;
    }
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  @Post('register')
  register(@Body() user: User): Promise<User> {
    return this.logonService.register(user);
  }

  @Get('userList')
  @UseGuards(AuthGuard)
  findAll(): Promise<User[]> {
    return this.logonService.findAll();
  }

  @Get('logout')
  logout(@Req() req: Request & { session: session.Session }) {
    req.session.destroy(() => {
      return {
        message: 'logout success',
      };
    });
  }
}
