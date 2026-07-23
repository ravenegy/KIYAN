export class Money {
    constructor(
        public readonly amount: number,
        public readonly currency: string = 'USD'
    ) {
        if (amount < 0) {
            throw new Error('Amount cannot be negative');
        }
    }

    public add(other: Money): Money {
        if (this.currency !== other.currency) {
            throw new Error('Cannot add money with different currencies');
        }
        return new Money(this.amount + other.amount, this.currency);
    }

    public multiply(multiplier: number): Money {
        return new Money(this.amount * multiplier, this.currency);
    }
}
