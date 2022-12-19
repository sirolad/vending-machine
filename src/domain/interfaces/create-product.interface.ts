import { User } from '../user';

export interface CreateProductInterface {
  id?: number;

  amountAvailable: number;

  cost: number;

  name: string;

  user?: User;

  sellerId?: number;
}
