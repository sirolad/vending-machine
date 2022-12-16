import { Exclude } from 'class-transformer';
import { Role } from '../../domain/enum/role.enum';
import { CreateUserInterface } from '../../domain/interfaces/create-user.interface';

export class CreatedUserDto implements CreateUserInterface {
  username: string;
  @Exclude()
  password: string;
  deposit: number;
  role: Role;

  constructor(username: string, password: string, deposit: number, role: Role) {
    this.username = username;
    this.password = password;
    this.deposit = deposit;
    this.role = role;
  }
}
