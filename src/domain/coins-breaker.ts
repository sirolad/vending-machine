export class CoinsBreaker {
  public coins: number[] = [100, 50, 20, 10, 5];

  public breakBalanceToCoins(balance: number): Record<number, number> | number {
    const change: Record<number, number> = {};
    this.coins.forEach((coin) => {
      const count: number = balance / coin;

      if (count > 0) {
        change[coin] = count;
        balance -= count * coin;

        if (balance < 0) {
          return;
        }
      }
    });

    return Object.keys(change).length === 0 ? 0 : change;
  }
}
