import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Auth, Public } from 'src/utils/decorator';
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
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Public()
  @Post('register')
  register(@Body() user: User): Promise<User> {
    return this.userService.register(user);
  }

  @ApiTags('User')
  @ApiResponse({
    status: 200,
    description: 'The user list has been successfully retrieved',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiBearerAuth()
  @Get('userList')
  @Auth()
  async findAll(): Promise<User[]> {
    const users = await this.userService.findAll();
    return users.map((user) => {
      return user;
    });
  }

  @ApiTags('User')
  @ApiBearerAuth()
  @Get(':id')
  @Auth()
  async findById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(+id);
  }

  @ApiTags('User')
  @ApiBearerAuth()
  @Delete(':id')
  @Auth()
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.userService.deleteById(+id);
  }
}
