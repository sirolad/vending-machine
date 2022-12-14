import { User } from '../user';

export interface CreateProductInterface {
  amountAvailable: number;

  cost: number;

  name: string;

  sellerId: User;
}
