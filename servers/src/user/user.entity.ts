import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/tasks/entities/task.entity';
import { Avatar } from 'src/avatar/entities/avatar.entity';
import { Role } from 'src/role/entities/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'username',
    example: 'admin',
  })
  @Column({
    type: 'varchar',
    length: 255,
  })
  @MinLength(5, {
    message: 'username length must be gather than 5 characters',
  })
  @IsNotEmpty({
    message: 'username must not be empty',
  })
  username: string;

  @ApiProperty({
    description: 'password',
    example: 'admin',
  })
  @Column()
  @IsNotEmpty({
    message: 'password must not be empty',
  })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @OneToOne(() => Avatar)
  @JoinColumn({ name: 'avatar_id' })
  avatar: Avatar;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}

export interface ILogon {
  username: string;
  password: string;
}
