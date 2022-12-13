import { Injectable } from '@nestjs/common';
import { User } from '../database/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInterface } from '../../domain/interfaces/UserInterface';
import { CreateUserInterface } from 'src/domain/interfaces/create-user.interface';
import { CreateUserDto } from '../../handler/dto/create-user.dto';

@Injectable()
export class UserRepository implements UserInterface {
  constructor(
    @InjectRepository(User)
    private readonly ormRepository: Repository<User>,
  ) {}

  async createUser(
    createUserDto: CreateUserInterface,
  ): Promise<CreateUserInterface> {
    const user = this.ormRepository.create(createUserDto);

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
    updateUserDto: CreateUserInterface,
  ): Promise<CreateUserInterface> {
    const user = this.getOneUser(id);

    return this.ormRepository.save({ ...user, ...updateUserDto });
  }
}
