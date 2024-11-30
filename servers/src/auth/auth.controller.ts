import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ILogon } from 'src/user/user.entity';
import { Auth, Public } from 'src/utils/decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags('Auth')
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('logon')
  signIn(@Body() logonDetail: ILogon) {
    return this.authService.signIn(logonDetail);
  }

  @ApiTags('Auth')
  @Get('profile')
  @Auth()
  getProfile(@Request() req) {
    return {
      username: req.user.username,
      role: req.user.role,
    };
  }
}
