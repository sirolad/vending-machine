import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { CreateUserInterface } from '../../../domain/interfaces/create-user.interface';
import { User } from '../../database/entity/user.entity';
import { Product } from '../../database/entity/product.entity';

type Subjects = InferSubjects<typeof User | typeof Product> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

export enum Action {
  Update = 'update',
  Delete = 'delete',
}
export class ProductAbilityFactory {
  createForUser(user: CreateUserInterface) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
      Ability as AbilityClass<AppAbility>,
    );

    can(Action.Update, Product, { user: user.id });
    can(Action.Delete, Product, { user: user.id });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
