import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AvatarService } from 'src/avatar/avatar.service';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private avatarService: AvatarService,
    private roleService: RoleService,
  ) {}
  async findAll(): Promise<User[]> {
    // const users = await this.usersRepository.find({
    //   relations: ['avatar', 'role'],
    // });
    // use querybuilder to query some information
    // const users = await this.usersRepository.query(
    //   'SELECT username, isActive FROM user LEFT JOIN avatar ON user.avatar_id = avatar.id LEFT JOIN role ON user.role_id = role.id',
    // );

    const users = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .leftJoinAndSelect('user.role', 'role')
      .select(['user.username', 'user.isActive', 'avatar.url', 'role.name'])
      .getMany();
    return users;
  }

  findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { username },
      relations: ['avatar', 'role'],
    });
    //return this.usersRepository.findOneBy({ username });
  }

  async findByIdAllInformation(id: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['avatar', 'role'],
    });
  }

  async findById(id: number): Promise<User | null> {
    // return this.usersRepository.findOne({
    //   where: { id },
    //   relations: ['avatar', 'role'],
    // });

    const user = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .leftJoinAndSelect('user.role', 'role')
      .select(['user.username', 'user.isActive', 'avatar.url', 'role.name'])
      .where('user.id = :id', { id })
      .getMany();

    return user[0];
  }

  async deleteById(id: number): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['avatar'],
    });
    if (user) {
      await this.usersRepository.delete(id);
      await this.avatarService.remove(user.avatar.id);
    }
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
    const role = await this.roleService.findOne(2);
    user.avatar = avatar;
    user.role = role;
    const savedUser = await this.usersRepository.save(user);
    const newUser = this.findById(savedUser.id);
    return newUser;
  }
}
