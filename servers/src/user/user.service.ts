import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AvatarService } from 'src/avatar/avatar.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private avatarService: AvatarService,
  ) {}
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  findById(id: number): Promise<User | null> {
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
    if (await this.findByUsername(user.username)) {
      throw new BadRequestException('username is duplicate', '101');
    }
    user.password = await bcrypt.hash(user.password, 10);
    const avatar = await this.avatarService.create({});
    user.avatar = avatar;
    const addedUser = await this.usersRepository.save(user);
    delete addedUser.password;
    return addedUser;
  }
}
