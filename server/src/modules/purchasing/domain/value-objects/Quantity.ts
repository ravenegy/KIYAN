export class Quantity {
    constructor(
        public readonly value: number
    ) {
        if (value < 0) {
            throw new Error('Quantity cannot be negative');
        }
    }

    public add(other: Quantity): Quantity {
        return new Quantity(this.value + other.value);
    }

    public subtract(other: Quantity): Quantity {
        if (this.value < other.value) {
            throw new Error('Cannot subtract quantity below zero');
        }
        return new Quantity(this.value - other.value);
    }
}
