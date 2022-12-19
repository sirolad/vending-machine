import { Role } from '../../enum/role.enum';

export interface CreateUserInterface {
  id?: number;
  username: string;
  password: string;
  deposit?: number;
  role: Role;
}
