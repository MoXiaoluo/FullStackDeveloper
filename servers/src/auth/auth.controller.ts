import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ILogon } from 'src/user/user.entity';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/utils/decorator';
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
  getProfile(@Request() req) {
    return req.user;
  }
}
