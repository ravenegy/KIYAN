import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';

interface QuantityProps {
    readonly value: number;
}

export class Quantity extends ValueObject<QuantityProps> {
    private constructor(props: QuantityProps) {
        super(props);
    }

    public static create(value: number): Quantity {
        if (value < 0) {
            throw new Error('Quantity cannot be negative.');
        }
        return new Quantity({ value });
    }

    public get value(): number {
        return this.props.value;
    }

    public add(other: Quantity): Quantity {
        return Quantity.create(this.value + other.value);
    }

    public subtract(other: Quantity): Quantity {
        return Quantity.create(this.value - other.value);
    }
}
