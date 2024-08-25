import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ILogon, User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LogonService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  /**
   *
   * @param {User} user user detail information, the username can't be empty and duplicate.
   * @returns {User}, create success will return user information
   */
  async register(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async login(logonDetail: ILogon): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({
      username: logonDetail.username,
    });
    delete user.password;
    return user;
  }
}
