import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';
import { Money } from './Money';

interface DiscountProps {
    readonly percentage: number;
}

export class Discount extends ValueObject<DiscountProps> {
    private constructor(props: DiscountProps) {
        super(props);
    }

    public static create(percentage: number): Discount {
        if (percentage < 0 || percentage > 100) {
            throw new Error('Discount percentage must be between 0 and 100.');
        }
        return new Discount({ percentage });
    }

    public get percentage(): number {
        return this.props.percentage;
    }

    public applyTo(amount: Money): Money {
        const discountAmount = amount.amount * (this.percentage / 100);
        return Money.create(amount.amount - discountAmount, amount.currency);
    }
}
