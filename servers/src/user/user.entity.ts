import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, MinLength } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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
