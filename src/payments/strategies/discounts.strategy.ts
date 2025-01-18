import { DiscountStrategy } from 'src/payments/strategies/payments.interface';

export type Discount = {
  type: string;
  value: number;
};

export class PercentageDiscount implements DiscountStrategy {
  constructor(private readonly percentage: number) {}

  applyDiscount(amount: number): number {
    return Math.max(
      +(
        Math.floor((amount - (amount * this.percentage) / 100) * 100) / 100
      ).toFixed(2),
      0,
    );
  }
}

export class DiscountStrategyFactory {
  static createDiscountStrategy(discount: Discount): DiscountStrategy {
    switch (discount.type) {
      case 'percentage': {
        return new PercentageDiscount(discount.value);
      }
      default:
        throw new Error('Invalid discount type.');
    }
  }
}
