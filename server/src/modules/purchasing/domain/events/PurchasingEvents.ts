export class PurchaseOrderCreatedEvent {
    constructor(
        public readonly aggregateId: string,
        public readonly supplierId: string,
        public readonly totalAmount: number,
        public readonly timestamp: Date = new Date()
    ) {}
}

export class PurchaseOrderApprovedEvent {
    constructor(
        public readonly aggregateId: string,
        public readonly approvedBy: string,
        public readonly timestamp: Date = new Date()
    ) {}
}

export class PurchaseOrderIssuedEvent {
    constructor(
        public readonly aggregateId: string,
        public readonly supplierId: string,
        public readonly timestamp: Date = new Date()
    ) {}
}

export class PurchaseOrderReceivedEvent {
    constructor(
        public readonly aggregateId: string,
        public readonly receiptId: string,
        public readonly timestamp: Date = new Date()
    ) {}
}

export class SupplierQualifiedEvent {
    constructor(
        public readonly aggregateId: string,
        public readonly qualificationLevel: string,
        public readonly timestamp: Date = new Date()
    ) {}
}

export class RfqPublishedEvent {
    constructor(
        public readonly aggregateId: string,
        public readonly targetSuppliers: readonly string[],
        public readonly timestamp: Date = new Date()
    ) {}
}

export class QuotationAcceptedEvent {
    constructor(
        public readonly aggregateId: string,
        public readonly rfqId: string,
        public readonly supplierId: string,
        public readonly timestamp: Date = new Date()
    ) {}
}
