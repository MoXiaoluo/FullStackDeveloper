import { Module } from '@nestjs/common';
import { LogonController } from './logon.controller';
import { LogonService } from './logon.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [LogonController],
  providers: [LogonService],
})
export class LogonModule {}
