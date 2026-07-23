export class CreatePurchaseOrderCommand {
    constructor(
        public readonly supplierId: string,
        public readonly expectedDeliveryDate: Date,
        public readonly notes: string
    ) {}
}

export class AddPurchaseOrderLineCommand {
    constructor(
        public readonly orderId: string,
        public readonly itemId: string,
        public readonly quantity: number,
        public readonly unitPrice: number,
        public readonly expectedDeliveryDate: Date
    ) {}
}

export class SubmitPurchaseOrderCommand {
    constructor(public readonly orderId: string) {}
}

export class ApprovePurchaseOrderCommand {
    constructor(
        public readonly orderId: string,
        public readonly approvedBy: string
    ) {}
}

export class RejectPurchaseOrderCommand {
    constructor(public readonly orderId: string) {}
}

export class CancelPurchaseOrderCommand {
    constructor(
        public readonly orderId: string,
        public readonly reason: string
    ) {}
}

export class IssuePurchaseOrderCommand {
    constructor(public readonly orderId: string) {}
}

export class ReceiveGoodsCommand {
    constructor(
        public readonly orderId: string,
        public readonly lineId: string,
        public readonly quantity: number
    ) {}
}

export class CreateSupplierCommand {
    constructor(
        public readonly name: string,
        public readonly contactEmail: string
    ) {}
}

export class QualifySupplierCommand {
    constructor(
        public readonly supplierId: string,
        public readonly qualificationLevel: string
    ) {}
}

export class SuspendSupplierCommand {
    constructor(public readonly supplierId: string) {}
}

export class CreateRfqCommand {
    constructor(
        public readonly itemId: string,
        public readonly requiredQuantity: number,
        public readonly requiredByDate: Date
    ) {}
}

export class AddRfqTargetSupplierCommand {
    constructor(
        public readonly rfqId: string,
        public readonly supplierId: string
    ) {}
}

export class PublishRfqCommand {
    constructor(public readonly rfqId: string) {}
}

export class SubmitQuotationCommand {
    constructor(
        public readonly rfqId: string,
        public readonly supplierId: string,
        public readonly unitPrice: number,
        public readonly leadTimeDays: number,
        public readonly validUntil: Date
    ) {}
}

export class AcceptQuotationCommand {
    constructor(public readonly quotationId: string) {}
}
