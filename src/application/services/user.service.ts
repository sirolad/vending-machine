import { Inject, Injectable } from '@nestjs/common';
import { UserInterface } from '../../domain/interfaces/UserInterface';
import { CreateUserInterface } from 'src/domain/interfaces/create-user.interface';
import { UpdateUserInterface } from '../../domain/interfaces/update-user.interface';
import { User } from '../../domain/user';

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

  async update(id: number, updateUserDto: UpdateUserInterface) {
    return this.userInterface.updateUser(id, updateUserDto);
  }

  async remove(id: number) {
    return this.userInterface.removeUser(id);
  }

  async findByUsername(username: string): Promise<User> {
    return this.userInterface.findByUsername(username);
  }
}
