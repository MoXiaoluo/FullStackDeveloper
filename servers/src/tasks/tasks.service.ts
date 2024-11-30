import { Injectable, NotFoundException } from '@nestjs/common';
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

  /**
   * create new task for current logon user
   * @param createTaskDto task information
   * @param userId user id
   * @returns new task infomation
   */
  async create(createTaskDto: CreateTaskDto, userId: string) {
    const user = await this.userService.findByIdAllInformation(+userId);
    createTaskDto.user = user;
    const newTask = await this.taksRepository.save(createTaskDto);
    return this.findOne(newTask.id, userId);
  }

  /**
   * get the task list by user id
   * @param userId user id
   * @returns Task List
   */
  async findAll(userId: string): Promise<Task[]> {
    const tasks = await this.taksRepository.find({
      where: { user: { id: +userId } },
    });
    return tasks;
  }

  /**
   * get the task by id
   * @param id task id
   * @param userId user id
   * @returns Task
   */
  async findOne(id: number, userId: string): Promise<Task> {
    const user = await this.userService.findById(+userId);
    return await this.taksRepository.findOne({
      where: { id, user },
    });
  }

  /**
   * update existing task
   * @param createTaskDto update task data
   * @param userId user id
   * @returns Task
   */
  async update(id: number, userId: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id, userId);
    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }
    this.taksRepository.merge(task, updateTaskDto); // 合并更新字段
    return this.taksRepository.save(task);
  }

  /**
   * delete the task for current user
   * @param id task id
   * @param userId user id
   * @returns void
   */
  async remove(id: number, userId: string) {
    const task = await this.findOne(id, userId);
    return this.taksRepository.remove(task);
  }
}
