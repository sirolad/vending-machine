import { Inject, Injectable } from '@nestjs/common';
import { UserInterface } from '../../domain/interfaces/user';
import {
  UpdateUserInterface,
  CreateDepositInterface,
  CreateUserInterface,
} from '../../domain/interfaces/user';
import { User } from '../../domain';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserInterface')
    private readonly userInterface: UserInterface,
  ) {}

  async create(createUser: CreateUserInterface): Promise<CreateUserInterface> {
    return this.userInterface.createUser(createUser);
  }

  async findAll() {
    return this.userInterface.getAllUsers();
  }

  async findOne(id: number) {
    return this.userInterface.getOneUser(id);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserInterface,
    user: CreateUserInterface,
  ) {
    return this.userInterface.updateUser(id, updateUserDto, user);
  }

  async remove(id: number, user: CreateUserInterface) {
    return this.userInterface.removeUser(id, user);
  }

  async findByUsername(username: string): Promise<User> {
    return this.userInterface.findByUsername(username);
  }

  async depositAmount(
    deposit: CreateDepositInterface,
    user: CreateUserInterface,
  ): Promise<User> {
    return this.userInterface.depositAmount(deposit, user);
  }

  async resetDeposit(user: CreateUserInterface): Promise<User> {
    return this.userInterface.resetDepositAmount(user);
  }
}
