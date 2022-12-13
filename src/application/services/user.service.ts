import { Inject, Injectable } from '@nestjs/common';
import { UserInterface } from '../../domain/interfaces/UserInterface';
import { CreateUserInterface } from 'src/domain/interfaces/create-user.interface';
import { UpdateUserInterface } from '../../domain/interfaces/update-user.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserInterface')
    private readonly userInterface: UserInterface,
  ) {}

  async create(createUser: CreateUserInterface) {
    return this.userInterface.createUser(createUser);
  }

  findAll() {
    return this.userInterface.getAllUsers();
  }

  findOne(id: number) {
    return this.userInterface.getOneUser(id);
  }

  update(id: number, updateUserDto: UpdateUserInterface) {
    return this.userInterface.updateUser(id, updateUserDto);
  }

  remove(id: number) {
    return this.userInterface.removeUser(id);
  }
}
