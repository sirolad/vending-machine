import { Injectable } from '@nestjs/common';
import { User } from '../database/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserInterface } from '../../domain/interfaces/UserInterface';
import { CreateUserInterface } from 'src/domain/interfaces/create-user.interface';
import { UpdateUserInterface } from '../../domain/interfaces/update-user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository implements UserInterface {
  constructor(
    @InjectRepository(User)
    private readonly ormRepository: Repository<User>,
  ) {}

  async createUser(
    createUserDto: CreateUserInterface,
  ): Promise<CreateUserInterface> {
    const { password } = { ...createUserDto };
    const hash = await bcrypt.hash(password, 10);
    const newUser = Object.assign({}, createUserDto, { password: hash });
    const user = this.ormRepository.create(newUser);

    return this.ormRepository.save(user);
  }

  async getAllUsers(): Promise<CreateUserInterface[]> {
    return this.ormRepository.find();
  }

  async getOneUser(id: number): Promise<CreateUserInterface> {
    return this.ormRepository.findOneOrFail({ where: { id } });
  }

  async updateUser(
    id: number,
    user: UpdateUserInterface,
  ): Promise<CreateUserInterface> {
    await this.ormRepository.update(id, user);

    return this.getOneUser(id);
  }

  async removeUser(id: number): Promise<DeleteResult> {
    await this.getOneUser(id);
    return this.ormRepository.delete(id);
  }
}
