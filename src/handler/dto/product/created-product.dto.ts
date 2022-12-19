import { CreateProductInterface } from '../../../domain/interfaces/product/create-product.interface';

export class CreatedProductDto implements CreateProductInterface {
  id: number;
  amountAvailable: number;
  cost: number;
  name: string;
  sellerId: number;

  constructor(
    id: number,
    amountAvailable: number,
    cost: number,
    name: string,
    sellerId: number,
  ) {
    this.id = id;
    this.amountAvailable = amountAvailable;
    this.cost = cost;
    this.name = name;
    this.sellerId = sellerId;
  }
}
