import { Body, Controller, Get, Post } from '@nestjs/common';
import { LogonService } from './logon.service';
import { ILogon, User } from './user.entity';

@Controller('logon')
export class LogonController {
  constructor(private readonly logonService: LogonService) {}

  @Post()
  login(@Body() login: ILogon): Promise<User> {
    return this.logonService.login(login);
  }

  @Post('register')
  register(@Body() user: User): Promise<User> {
    return this.logonService.register(user);
  }

  @Get('userList')
  findAll(): Promise<User[]> {
    return this.logonService.findAll();
  }
}
