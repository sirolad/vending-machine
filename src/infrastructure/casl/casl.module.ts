import { Module } from '@nestjs/common';
import { UserAbilityFactory } from './casl-ability.factory/user-ability.factory';
import { ProductAbilityFactory } from './casl-ability.factory/product-ability.factory';

@Module({
  providers: [UserAbilityFactory, ProductAbilityFactory],
  exports: [UserAbilityFactory, ProductAbilityFactory],
})
export class CaslModule {}
