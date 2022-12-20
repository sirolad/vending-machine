import { Inject, Injectable } from '@nestjs/common';

import { CreateUserInterface } from '../../domain/interfaces/user';
import {
  PurchaseInterface,
  PurchaseResponseInterface,
  UpdateProductInterface,
  CreateProductInterface,
  ProductInterface,
} from '../../domain/interfaces/product';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductInterface')
    private readonly productInterface: ProductInterface,
  ) {}

  async create(createProduct: CreateProductInterface, headers) {
    return this.productInterface.createProduct(createProduct, headers);
  }

  async findAll(): Promise<CreateProductInterface[]> {
    return this.productInterface.getAllProducts();
  }

  async findOne(id: number): Promise<CreateProductInterface> {
    return this.productInterface.getOneProduct(id);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductInterface,
    user: CreateUserInterface,
  ) {
    return this.productInterface.updateProduct(id, updateProductDto, user);
  }

  async remove(id: number, user: CreateUserInterface): Promise<void> {
    await this.productInterface.removeProduct(id, user);
  }

  async buy(
    id: number,
    purchase: PurchaseInterface,
    user: CreateUserInterface,
  ): Promise<PurchaseResponseInterface> {
    return this.productInterface.buyProduct(id, purchase, user);
  }
}
