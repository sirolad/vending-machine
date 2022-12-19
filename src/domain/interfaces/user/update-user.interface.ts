import { Role } from '../../enum/role.enum';

export interface UpdateUserInterface {
  username?: string;
  password?: string;
  deposit?: number;
  role?: Role;
}
