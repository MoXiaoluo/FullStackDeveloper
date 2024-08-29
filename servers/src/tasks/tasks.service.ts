import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taksRepository: Repository<Task>,
    private readonly userService: UserService,
  ) {}
  async create(createTaskDto: CreateTaskDto, userId: string) {
    const user = await this.userService.findById(+userId);
    createTaskDto.user = user;
    return this.taksRepository.save(createTaskDto);
  }

  findAll(): Promise<Task[]> {
    return this.taksRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    return await this.taksRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }
    this.taksRepository.merge(task, updateTaskDto); // 合并更新字段
    return this.taksRepository.save(task);
  }

  async remove(id: number) {
    const task = await this.findOne(id);
    return this.taksRepository.remove(task);
  }
}
