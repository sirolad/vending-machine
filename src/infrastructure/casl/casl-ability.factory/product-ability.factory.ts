import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { CreateUserInterface } from '../../../domain/interfaces/user/create-user.interface';
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    can(Action.Update, Product, { 'user.id': user.id });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    can(Action.Delete, Product, { 'user.id': user.id });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
