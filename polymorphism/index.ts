// Polymorphism allows the same method name or interface to exhibit different behaviors depending on the object that is invoking it.
// Comes up in two forms -> Compile time & Run time

class Calculator {
  // TypeScript uses overload signatures + a single implementation
  add(a: number, b: number): number;
  add(a: number, b: number, c: number): number;
  add(a: number, b: number, c?: number): number {
    if (c !== undefined) {
      return a + b + c;
    }
    return a + b;
  }
}

const calc = new Calculator();
console.log(calc.add(2, 3));
console.log(calc.add(2.5, 3.5));
console.log(calc.add(1, 2, 3));

class NotificationService {
  protected recipient: string;
  protected message: string;

  constructor(recipient: string, message: string) {
    this.recipient = recipient;
    this.message = message;
  }

  send(): void {
    console.log(`Sending generic notification to ${this.recipient}`);
  }
}

class EmailNotificationService extends NotificationService {
  private subject: string;

  constructor(recipient: string, message: string, subject: string) {
    super(recipient, message);
    this.subject = subject;
  }

  send(): void {
    console.log(
      `Sending EMAIL to ${this.recipient} | Subject: ${this.subject}`,
    );
  }
}

class SMSNotificationService extends NotificationService {
  private phoneNumber: string;

  constructor(recipient: string, message: string, phoneNumber: string) {
    super(recipient, message);
    this.phoneNumber = phoneNumber;
  }

  send(): void {
    console.log(
      `Sending SMS to ${this.phoneNumber} | Message: ${this.message}`,
    );
  }
}

class PushNotificationService extends NotificationService {
  private deviceToken: string;

  constructor(recipient: string, message: string, deviceToken: string) {
    super(recipient, message);
    this.deviceToken = deviceToken;
  }

  send(): void {
    console.log(
      `Sending PUSH to device ${this.deviceToken.substring(0, 8)}` +
        `... | Alert: ${this.message}`,
    );
  }
}

const notifications: NotificationService[] = [
  new EmailNotificationService(
    "alice@example.com",
    "Your order shipped!",
    "Order Update",
  ),
  new SMSNotificationService("Bob", "Code: 482910", "+1-555-0123"),
  new PushNotificationService("Charlie", "New message", "d8a3f4b2c1e5a9b7"),
];

for (const n of notifications) {
  n.send();
}
