import { CreateProductInterface } from './interfaces/product/create-product.interface';

export class Product implements CreateProductInterface {
  public amountAvailable: number;

  public cost: number;

  public name: string;
}
