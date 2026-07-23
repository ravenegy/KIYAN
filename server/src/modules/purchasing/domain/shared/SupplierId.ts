export class SupplierId {
    constructor(public readonly value: string) {
        if (!value) throw new Error('SupplierId cannot be empty');
    }
}
