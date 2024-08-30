import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Avatar {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '头像地址',
    example: 'https://xxx.com/xxx.png',
  })
  @Column({
    default: '/static/avatar.jpeg',
  })
  url: string;
}
