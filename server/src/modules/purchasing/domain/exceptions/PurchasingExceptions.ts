export class PurchasingDomainException extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class InvalidPurchaseOrderStatusException extends PurchasingDomainException {
    constructor(orderId: string, currentStatus: string, expectedStatus: string) {
        super(`Purchase order ${orderId} is in status ${currentStatus}, expected ${expectedStatus}`);
    }
}

export class SupplierNotActiveException extends PurchasingDomainException {
    constructor(supplierId: string) {
        super(`Supplier ${supplierId} is not active`);
    }
}

export class QuotationExpiredException extends PurchasingDomainException {
    constructor(quotationId: string) {
        super(`Quotation ${quotationId} has expired`);
    }
}

export class PurchaseOrderWithoutLinesException extends PurchasingDomainException {
    constructor(orderId: string) {
        super(`Purchase order ${orderId} must have at least one line`);
    }
}
