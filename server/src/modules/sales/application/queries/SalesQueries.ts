export class GetSalesOrderByIdQuery {
    constructor(public readonly orderId: string) {}
}

export class GetSalesOrdersQuery {
    constructor(
        public readonly customerId?: string,
        public readonly status?: string
    ) {}
}

export class GetCustomerByIdQuery {
    constructor(public readonly customerId: string) {}
}

export class GetCustomersQuery {
    constructor(public readonly status?: string) {}
}

export class GetSalesQuotationByIdQuery {
    constructor(public readonly quotationId: string) {}
}

export class GetSalesQuotationsQuery {
    constructor(
        public readonly customerId?: string,
        public readonly status?: string
    ) {}
}

export class GetSalesInvoiceByIdQuery {
    constructor(public readonly invoiceId: string) {}
}

export class GetSalesInvoicesQuery {
    constructor(
        public readonly salesOrderId?: string,
        public readonly customerId?: string,
        public readonly status?: string
    ) {}
}
