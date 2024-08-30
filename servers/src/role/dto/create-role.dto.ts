import { IsEnum, IsNotEmpty } from 'class-validator';
import { RoleEnum } from '../entities/role.entity';

export class CreateRoleDto {
  @IsEnum(RoleEnum, {
    message: 'Invalid role name',
  })
  name?: RoleEnum;

  description?: string;
}
