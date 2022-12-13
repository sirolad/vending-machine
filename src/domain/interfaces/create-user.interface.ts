import { Role } from '../enum/role.enum';

export interface CreateUserInterface {
  username: string;
  password: string;
  deposit: number;
  role: Role;
}
