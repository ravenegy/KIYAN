import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';
import { Money } from './Money';

interface TaxRateProps {
    readonly percentage: number;
}

export class TaxRate extends ValueObject<TaxRateProps> {
    private constructor(props: TaxRateProps) {
        super(props);
    }

    public static create(percentage: number): TaxRate {
        if (percentage < 0) {
            throw new Error('Tax rate percentage cannot be negative.');
        }
        return new TaxRate({ percentage });
    }

    public get percentage(): number {
        return this.props.percentage;
    }

    public calculateTax(amount: Money): Money {
        const taxAmount = amount.amount * (this.percentage / 100);
        return Money.create(taxAmount, amount.currency);
    }
}
