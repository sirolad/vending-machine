import { Exclude } from 'class-transformer';
import { Role } from '../../../domain/enum/role.enum';
import { CreateUserInterface } from '../../../domain/interfaces/user/create-user.interface';

export class CreatedUserDto implements CreateUserInterface {
  id: number;
  username: string;
  @Exclude()
  password: string;
  deposit?: number;
  role: Role;

  constructor(
    id: number,
    username: string,
    password: string,
    role: Role,
    deposit?: number,
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
    this.deposit = deposit;
  }
}
