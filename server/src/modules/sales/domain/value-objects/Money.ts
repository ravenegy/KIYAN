import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';

interface MoneyProps {
    readonly amount: number;
    readonly currency: string;
}

export class Money extends ValueObject<MoneyProps> {
    private constructor(props: MoneyProps) {
        super(props);
    }

    public static create(amount: number, currency: string = 'USD'): Money {
        if (amount < 0) {
            throw new Error('Money amount cannot be negative.');
        }
        if (!currency || currency.trim() === '') {
            throw new Error('Currency cannot be empty.');
        }
        return new Money({ amount, currency });
    }

    public get amount(): number {
        return this.props.amount;
    }

    public get currency(): string {
        return this.props.currency;
    }

    public add(other: Money): Money {
        if (this.currency !== other.currency) {
            throw new Error('Cannot add money of different currencies.');
        }
        return Money.create(this.amount + other.amount, this.currency);
    }

    public subtract(other: Money): Money {
        if (this.currency !== other.currency) {
            throw new Error('Cannot subtract money of different currencies.');
        }
        return Money.create(this.amount - other.amount, this.currency);
    }

    public multiply(multiplier: number): Money {
        if (multiplier < 0) {
            throw new Error('Multiplier cannot be negative.');
        }
        return Money.create(this.amount * multiplier, this.currency);
    }
}
