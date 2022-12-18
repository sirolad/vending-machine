import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { CreateUserInterface } from '../../../domain/interfaces/create-user.interface';
import { User } from '../../database/entity/user.entity';

type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

export enum Action {
  Update = 'update',
  Delete = 'delete',
}
export class CaslAbilityFactory {
  createForUser(user: CreateUserInterface) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
      Ability as AbilityClass<AppAbility>,
    );

    can(Action.Update, User, { id: user.id });
    can(Action.Delete, User, { id: user.id });

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
