/*
Inheritance allows one class (called the subclass or child class) to inherit the properties and behaviors of another class (called the superclass or parent class).
*/

class Vehicle {
  protected make: string;
  protected model: string;
  protected year: number;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  startEngine(): void {
    console.log("Engine started");
  }

  stopEngine(): void {
    console.log("Engine stopped");
  }

  displayInfo(): void {
    console.log(`${this.year} ${this.make} ${this.model}`);
  }
}

class ElectricCar extends Vehicle {
  private batteryCapacity: number;

  constructor(
    make: string,
    model: string,
    year: number,
    batteryCapacity: number,
  ) {
    super(make, model, year);
    this.batteryCapacity = batteryCapacity;
  }

  chargeBattery(): void {
    console.log(`Charging ${this.batteryCapacity}kWh battery`);
  }
}

class GasCar extends Vehicle {
  private fuelTankSize: number;

  constructor(make: string, model: string, year: number, fuelTankSize: number) {
    super(make, model, year);
    this.fuelTankSize = fuelTankSize;
  }

  fillTank(): void {
    console.log(`Filling ${this.fuelTankSize}L fuel tank`);
  }
}

class NotificationClass {
  protected recipient: string;
  protected message: string;
  protected timestamp: string;

  constructor(recipient: string, message: string) {
    this.recipient = recipient;
    this.message = message;
    this.timestamp = new Date()
      .toISOString()
      .replace("T", " ")
      .substring(0, 19);
  }

  formatHeader(): string {
    return `[${this.timestamp}] To: ${this.recipient}`;
  }

  send(): void {
    console.log(this.formatHeader());
    console.log(`Message: ${this.message}`);
  }
}

class EmailNotification extends NotificationClass {
  private subject: string;

  constructor(recipient: string, message: string, subject: string) {
    super(recipient, message);
    this.subject = subject;
  }

  send(): void {
    console.log(this.formatHeader());
    console.log(`Subject: ${this.subject}`);
    console.log(`Body: ${this.message}`);
    console.log("Status: Email delivered");
  }
}

class EmailNotificationClass extends NotificationClass {
  private subject: string;

  constructor(recipient: string, message: string, subject: string) {
    super(recipient, message);
    this.subject = subject;
  }

  send(): void {
    console.log(this.formatHeader());
    console.log(`Subject: ${this.subject}`);
    console.log(`Body: ${this.message}`);
    console.log("Status: Email delivered");
  }
}

class SMSNotification extends NotificationClass {
  private phoneNumber: string;
  private static readonly MAX_LENGTH = 160;

  constructor(recipient: string, message: string, phoneNumber: string) {
    super(recipient, message);
    this.phoneNumber = phoneNumber;
  }

  send(): void {
    console.log(this.formatHeader());
    console.log(`Phone: ${this.phoneNumber}`);
    const smsBody =
      this.message.length > SMSNotification.MAX_LENGTH
        ? this.message.substring(0, SMSNotification.MAX_LENGTH - 3) + "..."
        : this.message;
    console.log(`SMS: ${smsBody}`);
    console.log(
      `Status: SMS sent (${smsBody.length}/${SMSNotification.MAX_LENGTH} chars)`,
    );
  }
}

class PushNotification extends NotificationClass {
  private deviceToken: string;
  private priority: string;

  constructor(
    recipient: string,
    message: string,
    deviceToken: string,
    priority: string,
  ) {
    super(recipient, message);
    this.deviceToken = deviceToken;
    this.priority = priority;
  }

  send(): void {
    console.log(this.formatHeader());
    console.log(`Device: ${this.deviceToken.substring(0, 8)}...`);
    console.log(`Priority: ${this.priority}`);
    console.log(`Alert: ${this.message}`);
    console.log("Status: Push notification delivered");
  }
}

const email = new EmailNotificationClass(
  "alice@example.com",
  "Your order has been shipped!",
  "Order Update",
);
email.send();

console.log();

const sms = new SMSNotification(
  "Bob",
  "Your verification code is 482910.",
  "+1-555-0123",
);
sms.send();

console.log();

const push = new PushNotification(
  "Charlie",
  "New message from Alice",
  "d8a3f4b2c1e5a9b7",
  "high",
);
push.send();
