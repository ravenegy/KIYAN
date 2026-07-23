import { ValueObject } from '../value-objects/ValueObject';
import { DomainException } from '../exceptions/DomainException';

export interface MoneyProps {
  amount: number;
  currency: string;
}

export class Money extends ValueObject<MoneyProps> {
  private constructor(props: MoneyProps) {
    super(props);
  }

  public static create(amount: number, currency: string): Money {
    if (amount < 0) {
      throw new DomainException('Money amount cannot be negative');
    }
    if (!currency || currency.trim().length === 0) {
      throw new DomainException('Currency must be specified');
    }
    return new Money({ amount, currency: currency.toUpperCase() });
  }

  public get amount(): number {
    return this.props.amount;
  }

  public get currency(): string {
    return this.props.currency;
  }
}
