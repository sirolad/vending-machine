import { Product } from '../product';
import { UpdateProductInterface } from './update-product.interface';
import { User } from '../user';

export interface ProductInterface {
  createProduct(createProduct: Product, headers): Promise<Product>;
  getAllProducts(): Promise<Product[]>;
  getOneProduct(id: number): Promise<Product>;
  updateProduct(
    id: number,
    product: UpdateProductInterface,
    user: User,
  ): Promise<Product>;
  removeProduct(id: number): Promise<any>;
}
