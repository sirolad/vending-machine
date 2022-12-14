import { Product } from '../product';
import { UpdateProductInterface } from './update-product.interface';

export interface ProductInterface {
  createProduct(createProduct: Product): Promise<Product>;
  getAllProducts(): Promise<Product[]>;
  getOneProduct(id: number): Promise<Product>;
  updateProduct(id: number, product: UpdateProductInterface): Promise<Product>;
  removeProduct(id: number): Promise<any>;
}
