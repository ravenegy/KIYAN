export class QuotationId {
    constructor(public readonly value: string) {
        if (!value) throw new Error('QuotationId cannot be empty');
    }
}
