export interface DiscountStrategy {
  applyDiscount(amount: number): number;
}

export interface PaymentStrategy {
  processPayment(amount: number): Promise<any>;
}
