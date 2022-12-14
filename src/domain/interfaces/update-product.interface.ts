import { User } from '../user';

export interface UpdateProductInterface {
  amountAvailable?: number;

  cost?: number;

  name?: string;

  sellerId?: User;
}
