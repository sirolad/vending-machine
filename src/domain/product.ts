import { CreateProductInterface } from './interfaces/create-product.interface';
import { User } from './user';

export class Product implements CreateProductInterface {
  public amountAvailable: number;

  public cost: number;

  public name: string;

  public sellerId: User;
}
