export interface PurchaseResponseInterface {
  cost: number;
  product: string;
  balance: Record<number, number> | number;
}
