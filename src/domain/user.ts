import { Role } from './enum/role.enum';

export class User {
  public username: string;

  private password: string;

  public deposit: number;

  public role: Role[];
}
