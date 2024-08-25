import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogonModule } from './logon/logon.module';
import { User } from './logon/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'qwer1234',
      database: 'fullstack',
      entities: [User],
      synchronize: true,
    }),
    LogonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
