import { Injectable } from '@nestjs/common';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import { Repository } from 'typeorm';
import { Avatar } from './entities/avatar.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AvatarService {
  constructor(
    @InjectRepository(Avatar)
    private avatarRespository: Repository<Avatar>,
  ) {}
  create(createAvatarDto: CreateAvatarDto) {
    return this.avatarRespository.save(createAvatarDto);
  }

  findOne(id: number) {
    return this.avatarRespository.findOneBy({ id });
  }

  update(id: number, updateAvatarDto: UpdateAvatarDto) {
    return this.avatarRespository.update(id, updateAvatarDto);
  }

  remove(id: number) {
    return this.avatarRespository.delete(id);
  }
}
