import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';
import { User } from 'src/user/user.entity';

export class CreateTaskDto {
  @IsNotEmpty({
    message: 'Title is required',
  })
  title: string;

  @IsNotEmpty({
    message: 'Description is required',
  })
  description: string;

  @IsOptional({
    message: 'Status is optional',
  })
  @IsEnum(TaskStatus, {
    message:
      'Status must be one of the following values: pending, in_progress, completed',
  })
  status?: TaskStatus;

  user: User;
}
