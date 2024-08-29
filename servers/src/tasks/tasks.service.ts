import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taksRepository: Repository<Task>,
  ) {}
  create(createTaskDto: CreateTaskDto) {
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
    let task = await this.findOne(id);
    task = Object.assign(task, updateTaskDto);
    return this.taksRepository.save(task);
  }

  async remove(id: number) {
    const task = await this.findOne(id);
    return this.taksRepository.remove(task);
  }
}
