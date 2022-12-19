import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../database/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserInterface } from '../../domain/interfaces/UserInterface';
import { CreateUserInterface } from 'src/domain/interfaces/create-user.interface';
import { UpdateUserInterface } from '../../domain/interfaces/update-user.interface';
import { hashPassword } from '../helper/hash.helper';
import {
  Action,
  UserAbilityFactory,
} from '../casl/casl-ability.factory/user-ability.factory';

@Injectable()
export class UserRepository implements UserInterface {
  constructor(
    @InjectRepository(User)
    private readonly ormRepository: Repository<User>,
    private readonly userAbilityFactory: UserAbilityFactory,
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
    userDto: UpdateUserInterface,
    user: CreateUserInterface,
  ): Promise<CreateUserInterface> {
    const ability = this.userAbilityFactory.createForUser(user);
    const checked = await this.getOneUser(id);

    if (ability.can(Action.Update, checked)) {
      const hashedPassword = await hashPassword(userDto.password);
      const newUpdatedUser = Object.assign({}, userDto, {
        password: hashedPassword,
      });
      await this.ormRepository.update(id, newUpdatedUser);

      return this.getOneUser(id);
    }

    throw new UnauthorizedException();
  }

  async removeUser(
    id: number,
    user: CreateUserInterface,
  ): Promise<DeleteResult> {
    const ability = this.userAbilityFactory.createForUser(user);
    const checked = await this.getOneUser(id);

    if (ability.can(Action.Delete, checked)) {
      return this.ormRepository.delete(id);
    }

    throw new UnauthorizedException();
  }

  async findByUsername(username: string): Promise<CreateUserInterface> {
    return this.ormRepository.findOneOrFail({ where: { username } });
  }
}
