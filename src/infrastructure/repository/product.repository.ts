import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Product } from '../database/entity/product.entity';
import { ProductInterface } from '../../domain/interfaces/product.interface';
import { UpdateProductInterface } from '../../domain/interfaces/update-product.interface';
import { CreateProductInterface } from 'src/domain/interfaces/create-product.interface';
import { CreateUserInterface } from '../../domain/interfaces/create-user.interface';
import {
  Action,
  ProductAbilityFactory,
} from '../casl/casl-ability.factory/product-ability.factory';

@Injectable()
export class ProductRepository implements ProductInterface {
  constructor(
    @InjectRepository(Product)
    private readonly ormRepository: Repository<Product>,
    private readonly productAbilityFactory: ProductAbilityFactory,
  ) {}

  async createProduct(
    createProduct: CreateProductInterface,
    user: CreateUserInterface,
  ): Promise<CreateProductInterface> {
    const productWithSeller = Object.assign({}, createProduct, {
      user: user.id,
    }) as CreateProductInterface;

    const product = this.ormRepository.create(productWithSeller);

    return this.ormRepository.save(product);
  }

  async getAllProducts(): Promise<CreateProductInterface[]> {
    return this.ormRepository.find({
      relations: {
        user: true,
      },
    });
  }

  async getOneProduct(id: number): Promise<CreateProductInterface> {
    return this.ormRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
  }

  async removeProduct(
    id: number,
    user: CreateUserInterface,
  ): Promise<DeleteResult> {
    const ability = await this.productAbilityFactory.createForUser(user);
    const checkedProduct = await this.getOneProduct(id);

    if (ability.can(Action.Delete, checkedProduct)) {
      return this.ormRepository.delete(id);
    }
  }

  async updateProduct(
    id: number,
    product: UpdateProductInterface,
    user: CreateUserInterface,
  ): Promise<CreateProductInterface> {
    const ability = await this.productAbilityFactory.createForUser(user);
    const checkedProduct = await this.getOneProduct(id);

    if (ability.can(Action.Update, checkedProduct)) {
      await this.ormRepository.update(id, product);

      return this.getOneProduct(id);
    }

    throw new UnauthorizedException();
  }
}
