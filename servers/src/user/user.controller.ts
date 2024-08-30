import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Public } from 'src/utils/decorator';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('User')
  @ApiBody({
    type: User,
    description: 'Register a new user',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully registered',
  })
  @ApiResponse({
    status: 400,
    description: 'username is duplicated',
  })
  @Public()
  @Post('register')
  register(@Body() user: User): Promise<User> {
    return this.userService.register(user);
  }

  @ApiTags('User')
  @ApiBearerAuth()
  @Get('userList')
  async findAll(): Promise<User[]> {
    const users = await this.userService.findAll();
    return users.map((user) => {
      return user;
    });
  }
}
