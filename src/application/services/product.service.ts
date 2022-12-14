import { Inject, Injectable } from '@nestjs/common';

import { ProductInterface } from '../../domain/interfaces/product.interface';
import { CreateProductInterface } from '../../domain/interfaces/create-product.interface';
import { UpdateProductInterface } from '../../domain/interfaces/update-product.interface';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductInterface')
    private readonly productInterface: ProductInterface,
  ) {}

  async create(createProduct: CreateProductInterface) {
    return this.productInterface.createProduct(createProduct);
  }

  async findAll(): Promise<CreateProductInterface[]> {
    return this.productInterface.getAllProducts();
  }

  async findOne(id: number): Promise<CreateProductInterface> {
    return this.productInterface.getOneProduct(id);
  }

  async update(id: number, updateProductDto: UpdateProductInterface) {
    return this.productInterface.updateProduct(id, updateProductDto);
  }

  async remove(id: number): Promise<void> {
    await this.productInterface.removeProduct(id);
  }
}
