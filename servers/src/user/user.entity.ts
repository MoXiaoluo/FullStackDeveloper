import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @MinLength(10, {
    message: 'username length must be gather than 10 characters',
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
}

export interface ILogon {
  username: string;
  password: string;
}
