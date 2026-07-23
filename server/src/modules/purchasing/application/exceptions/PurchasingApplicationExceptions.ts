export class PurchasingApplicationException extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class PurchaseOrderNotFoundException extends PurchasingApplicationException {
    constructor(orderId: string) {
        super(`Purchase order ${orderId} not found`);
    }
}

export class SupplierNotFoundException extends PurchasingApplicationException {
    constructor(supplierId: string) {
        super(`Supplier ${supplierId} not found`);
    }
}

export class RfqNotFoundException extends PurchasingApplicationException {
    constructor(rfqId: string) {
        super(`RFQ ${rfqId} not found`);
    }
}

export class QuotationNotFoundException extends PurchasingApplicationException {
    constructor(quotationId: string) {
        super(`Quotation ${quotationId} not found`);
    }
}
