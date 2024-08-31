import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum RoleEnum {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'the id of the role', example: RoleEnum.USER })
  @Column({
    comment: 'the name of the role',
    default: RoleEnum.USER,
  })
  name: RoleEnum;

  @ApiProperty({
    description: 'the description of the role',
    example: 'nornal user',
  })
  @Column({
    comment: 'the description of the role',
  })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
