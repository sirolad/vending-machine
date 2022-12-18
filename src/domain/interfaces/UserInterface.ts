import { User } from '../user';
import { UpdateUserInterface } from './update-user.interface';

export interface UserInterface {
  createUser(createUser: User): Promise<User>;
  getAllUsers(): Promise<User[]>;
  getOneUser(id: number): Promise<User>;
  updateUser(
    id: number,
    userDto: UpdateUserInterface,
    user: User,
  ): Promise<User>;
  removeUser(id: number, user: User): Promise<any>;
  findByUsername(username: string): Promise<User>;
}
