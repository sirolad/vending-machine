import { Role } from './enum/role.enum';
import { CreateUserInterface } from './interfaces/user/create-user.interface';

export class User implements CreateUserInterface {
  public id?: number;

  public username: string;

  public password: string;

  public deposit?: number;

  public role: Role;
}
