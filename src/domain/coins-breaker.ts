export class CoinsBreaker {
  coins: number[] = [100, 50, 20, 10, 5];

  breakBalanceToCoins(balance: number): Record<number, number> | number {
    const change: Record<number, number> = {};
    let leftOver: number = balance;

    this.coins.forEach((coin) => {
      while (leftOver > coin) {
        if (change[coin]) {
          change[coin] += 1;
        } else {
          change[coin] = 1;
        }

        leftOver = leftOver - coin;

        if (leftOver < 0) {
          return;
        }
      }
    });
    // console.log(change);
    return Object.keys(change).length === 0 ? 0 : change;
  }
}
