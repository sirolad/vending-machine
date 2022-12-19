import { User } from '../../user';
import { UpdateUserInterface } from './update-user.interface';
import { CreateDepositInterface } from './create-deposit.interface';

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
  depositAmount(deposit: CreateDepositInterface, user: User): Promise<User>;
  resetDepositAmount(user: User): Promise<User>;
}
