export class PurchaseOrderId {
    constructor(public readonly value: string) {
        if (!value) throw new Error('PurchaseOrderId cannot be empty');
    }
}
