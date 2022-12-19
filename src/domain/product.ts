import { CreateProductInterface } from './interfaces/create-product.interface';

export class Product implements CreateProductInterface {
  public amountAvailable: number;

  public cost: number;

  public name: string;
}
