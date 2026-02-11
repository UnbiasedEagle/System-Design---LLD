// Interface act as a contract

interface PaymentGateway {
  initiatePayment(amount: number): void;
}

class StripePayment implements PaymentGateway {
  initiatePayment(amount: number): void {
    console.log(`Processing payment via Stripe: $${amount}`);
  }
}

class RazorpayPayment implements PaymentGateway {
  initiatePayment(amount: number): void {
    console.log(`Processing payment via Razorpay: ₹${amount}`);
  }
}

//Usage: Loose Coupling in Action
class CheckoutService {
  private paymentGateway: PaymentGateway;

  constructor(paymentGateway: PaymentGateway) {
    this.paymentGateway = paymentGateway;
  }

  setPaymentGateway(paymentGateway: PaymentGateway): void {
    this.paymentGateway = paymentGateway;
  }

  checkout(amount: number): void {
    this.paymentGateway.initiatePayment(amount);
  }
}

function main(): void {
  const stripeGateway: PaymentGateway = new StripePayment();
  const checkoutService = new CheckoutService(stripeGateway);
  checkoutService.checkout(120.5);

  const razorpayGateway: PaymentGateway = new RazorpayPayment();
  checkoutService.setPaymentGateway(razorpayGateway);
  checkoutService.checkout(150.5);
}

main();
