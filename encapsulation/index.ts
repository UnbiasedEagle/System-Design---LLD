class Product {
  private _name: string;
  private _price: number;

  constructor(name: string, price: number) {
    this._name = name;
    this.price = price; // Uses the setter for validation
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    if (value < 0) {
      throw new Error("Price cannot be negative");
    }
    this._price = value;
  }
}

class BankAccount {
  private accountHolder: string;
  private balance: number;

  constructor(accountHolder: string) {
    this.accountHolder = accountHolder;
    this.balance = 0;
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive");
    }
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= 0) {
      throw new Error("Withdrawal amount must be positive");
    }
    if (amount > this.balance) {
      throw new Error("Insufficient funds");
    }
    this.balance -= amount;
  }

  getBalance(): number {
    return this.balance;
  }

  getAccountHolder(): string {
    return this.accountHolder;
  }
}

class PaymentProcessor {
  private cardNumber: string;
  private amount: number;

  constructor(cardNumber: string, amount: number) {
    this.cardNumber = this.maskCardNumber(cardNumber);
    this.amount = amount;
  }

  private maskCardNumber(cardNumber: string): string {
    return "****-****-****-" + cardNumber.substring(cardNumber.length - 4);
  }

  processPayment(): void {
    console.log(
      `Processing payment of $${this.amount} for card ${this.cardNumber}`,
    );
  }
}

const payment = new PaymentProcessor("1234567812345678", 250.0);
payment.processPayment();
