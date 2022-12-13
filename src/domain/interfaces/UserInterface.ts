import { User } from '../user';

export interface UserInterface {
  createUser(createUser: User): Promise<User>;
  getAllUsers(): Promise<User[]>;
  getOneUser(id: number): Promise<User>;
  // updateUser(id: number, user: User): Promise<User>;
}
