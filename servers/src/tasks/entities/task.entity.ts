import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Title of the task',
    example: 'Task title',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'Description of the task',
    example: 'Task description',
  })
  @Column()
  description: string;

  @ApiProperty({
    description: 'Status of the task',
    enum: TaskStatus,
    example: TaskStatus.PENDING,
  })
  @Column({
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;
}
