import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Product } from '../database/entity/product.entity';
import { ProductInterface } from '../../domain/interfaces/product.interface';
import { UpdateProductInterface } from '../../domain/interfaces/update-product.interface';
import { CreateProductInterface } from 'src/domain/interfaces/create-product.interface';

@Injectable()
export class ProductRepository implements ProductInterface {
  constructor(
    @InjectRepository(Product)
    private readonly ormRepository: Repository<Product>,
  ) {}

  async createProduct(
    createProduct: CreateProductInterface,
  ): Promise<CreateProductInterface> {
    const product = this.ormRepository.create(createProduct);

    return this.ormRepository.save(product);
  }

  async getAllProducts(): Promise<CreateProductInterface[]> {
    return Promise.resolve([]);
  }

  async getOneProduct(id: number): Promise<CreateProductInterface> {
    return this.ormRepository.findOneOrFail({ where: { id } });
  }

  async removeProduct(id: number): Promise<DeleteResult> {
    await this.getOneProduct(id);
    return this.ormRepository.delete(id);
  }

  async updateProduct(
    id: number,
    product: UpdateProductInterface,
  ): Promise<CreateProductInterface> {
    await this.ormRepository.update(id, product);

    return this.getOneProduct(id);
  }
}
