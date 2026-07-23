export class GetPurchaseOrderByIdQuery {
    constructor(public readonly orderId: string) {}
}

export class GetPurchaseOrdersQuery {
    constructor(
        public readonly status?: string,
        public readonly supplierId?: string
    ) {}
}

export class GetSupplierByIdQuery {
    constructor(public readonly supplierId: string) {}
}

export class GetSuppliersQuery {
    constructor(
        public readonly status?: string,
        public readonly qualificationLevel?: string
    ) {}
}

export class GetRfqByIdQuery {
    constructor(public readonly rfqId: string) {}
}

export class GetRfqsQuery {
    constructor(public readonly status?: string) {}
}

export class GetQuotationsByRfqIdQuery {
    constructor(public readonly rfqId: string) {}
}
