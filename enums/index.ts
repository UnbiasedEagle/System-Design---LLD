enum OrderStatus {
  PLACED = "PLACED",
  CONFIRMED = "CONFIRMED",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

const currentStatus: OrderStatus = OrderStatus.SHIPPED;

if (currentStatus === OrderStatus.SHIPPED) {
  console.log("Your package is on the way!");
}

class Coin {
  static readonly PENNY = new Coin(1);
  static readonly NICKEL = new Coin(5);
  static readonly DIME = new Coin(10);
  static readonly QUARTER = new Coin(25);

  private readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }

  // Optional: Get all coin types
  static getAllCoins(): Coin[] {
    return [Coin.PENNY, Coin.NICKEL, Coin.DIME, Coin.QUARTER];
  }
}

const total: number = Coin.DIME.getValue() + Coin.QUARTER.getValue(); // 35
