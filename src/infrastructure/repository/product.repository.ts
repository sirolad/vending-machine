import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Product } from '../database/entity/product.entity';
import {
  ProductInterface,
  UpdateProductInterface,
  CreateProductInterface,
  PurchaseResponseInterface,
} from '../../domain/interfaces/product';
import { CreateUserInterface } from '../../domain/interfaces/user';
import {
  Action,
  ProductAbilityFactory,
} from '../casl/casl-ability.factory/product-ability.factory';
import { PurchaseInterface } from '../../domain/interfaces/product';
import {
  InsufficientStockException,
  InsufficientFundsException,
} from '../../domain/exceptions';
import { User } from '../database/entity/user.entity';
import { CoinsBreaker } from '../../domain';

@Injectable()
export class ProductRepository implements ProductInterface {
  constructor(
    @InjectRepository(Product)
    private readonly ormRepository: Repository<Product>,
    private readonly dataSource: DataSource,
    private readonly productAbilityFactory: ProductAbilityFactory,
    private readonly coinsBreaker: CoinsBreaker,
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
    return this.ormRepository.findOneOrFail({
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

  async buyProduct(
    id: number,
    purchase: PurchaseInterface,
    user: CreateUserInterface,
  ): Promise<PurchaseResponseInterface> {
    const product = await this.getOneProduct(id);
    const credit = user.deposit;
    const quantity = purchase.amount;
    const availableProduct = product.amountAvailable;
    const costOfProduct = product.cost;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      this.checkAvailability(quantity, availableProduct);
      const costOfPurchase = quantity * costOfProduct;
      this.checkFunds(costOfPurchase, credit);
      const costOfSale = credit - costOfPurchase;
      product.amountAvailable -= quantity;
      user.deposit = costOfSale;

      await this.ormRepository.save(product);
      await queryRunner.manager.save(user);

      const finalUser = await queryRunner.manager.findOne(User, {
        where: { id: user.id },
      });

      const finalBalance = finalUser.deposit;

      finalUser.deposit = 0;
      await queryRunner.manager.save(finalUser);
      await queryRunner.commitTransaction();
      return {
        cost: costOfProduct,
        product: product.name,
        balance: this.coinsBreaker.breakBalanceToCoins(finalBalance),
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(err.response, err.status);
    } finally {
      await queryRunner.release();
    }
  }

  private checkAvailability(quantity: number, availableProduct: number): void {
    if (quantity > availableProduct) throw new InsufficientStockException();
  }

  private checkFunds(costOfPurchase: number, credit: number): void {
    if (costOfPurchase > credit) throw new InsufficientFundsException();
  }
}
