import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Product } from '../database/entity/product.entity';
import { ProductInterface } from '../../domain/interfaces/product.interface';
import { UpdateProductInterface } from '../../domain/interfaces/update-product.interface';
import { CreateProductInterface } from 'src/domain/interfaces/create-product.interface';
import { JwtStrategy } from '../../auth/jwt.strategy';

@Injectable()
export class ProductRepository implements ProductInterface {
  constructor(
    @InjectRepository(Product)
    private readonly ormRepository: Repository<Product>,
    private readonly jwtStrategy: JwtStrategy,
  ) {}

  async createProduct(
    createProduct: CreateProductInterface,
    headers,
  ): Promise<CreateProductInterface> {
    const user = await this.jwtStrategy.getUserFromToken(
      headers['authorization'],
    );

    const productWithSeller = Object.assign({}, createProduct, {
      sellerId: user.id,
    }) as CreateProductInterface;

    const product = this.ormRepository.create(productWithSeller);

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
