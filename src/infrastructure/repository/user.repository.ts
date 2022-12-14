import { Injectable } from '@nestjs/common';
import { User } from '../database/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserInterface } from '../../domain/interfaces/UserInterface';
import { CreateUserInterface } from 'src/domain/interfaces/create-user.interface';
import { UpdateUserInterface } from '../../domain/interfaces/update-user.interface';
import { hashPassword } from '../helper/hash.helper';

@Injectable()
export class UserRepository implements UserInterface {
  constructor(
    @InjectRepository(User)
    private readonly ormRepository: Repository<User>,
  ) {}

  async createUser(
    createUserDto: CreateUserInterface,
  ): Promise<CreateUserInterface> {
    const hashedPassword = await hashPassword(createUserDto.password);
    const newUser = Object.assign({}, createUserDto, {
      password: hashedPassword,
    });
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
    const hashedPassword = await hashPassword(user.password);
    const newUpdatedUser = Object.assign({}, user, {
      password: hashedPassword,
    });
    await this.ormRepository.update(id, newUpdatedUser);

    return this.getOneUser(id);
  }

  async removeUser(id: number): Promise<DeleteResult> {
    await this.getOneUser(id);
    return this.ormRepository.delete(id);
  }
}
