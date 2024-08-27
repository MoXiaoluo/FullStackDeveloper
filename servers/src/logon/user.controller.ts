import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ILogon, User } from './user.entity';

@Controller('logon')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  login(@Body() login: ILogon): Promise<User> {
    return this.userService.login(login);
  }

  @Post('register')
  register(@Body() user: User): Promise<User> {
    return this.userService.register(user);
  }

  @Get('userList')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
