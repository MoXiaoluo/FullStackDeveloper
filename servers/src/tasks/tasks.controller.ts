import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { IPayloadUser } from 'src/types/global';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiBody({ type: CreateTaskDto, description: 'Create Task' })
  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Request() req: Request & { user: IPayloadUser },
  ) {
    return this.tasksService.create(createTaskDto, req.user.sub);
  }

  @Get()
  findAll(@Request() req: Request & { user: IPayloadUser }) {
    return this.tasksService.findAll(req.user.sub);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Request() req: Request & { user: IPayloadUser },
  ) {
    return this.tasksService.findOne(+id, req.user.sub);
  }

  @ApiBody({
    type: UpdateTaskDto,
    description: 'Update task',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req: Request & { user: IPayloadUser },
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(+id, req.user.sub, updateTaskDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Request() req: Request & { user: IPayloadUser },
  ) {
    return this.tasksService.remove(+id, req.user.sub);
  }
}
