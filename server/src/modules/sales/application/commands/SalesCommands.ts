export class CreateCustomerCommand {
    constructor(
        public readonly name: string,
        public readonly email: string
    ) {}
}

export class UpdateCustomerCommand {
    constructor(
        public readonly customerId: string,
        public readonly name: string,
        public readonly email: string
    ) {}
}

export class SuspendCustomerCommand {
    constructor(public readonly customerId: string) {}
}

export class ReactivateCustomerCommand {
    constructor(public readonly customerId: string) {}
}

export class CreateSalesOrderCommand {
    constructor(
        public readonly customerId: string,
        public readonly currency: string
    ) {}
}

export class AddSalesOrderLineCommand {
    constructor(
        public readonly orderId: string,
        public readonly itemId: string,
        public readonly quantity: number,
        public readonly unitPrice: number,
        public readonly currency: string,
        public readonly discountPercentage: number,
        public readonly taxRatePercentage: number
    ) {}
}

export class RemoveSalesOrderLineCommand {
    constructor(
        public readonly orderId: string,
        public readonly lineId: string
    ) {}
}

export class ConfirmSalesOrderCommand {
    constructor(public readonly orderId: string) {}
}

export class CancelSalesOrderCommand {
    constructor(
        public readonly orderId: string,
        public readonly reason: string
    ) {}
}

export class CompleteSalesOrderCommand {
    constructor(public readonly orderId: string) {}
}

export class CreateSalesQuotationCommand {
    constructor(
        public readonly customerId: string,
        public readonly validUntil: Date,
        public readonly currency: string
    ) {}
}

export class AddSalesQuotationLineCommand {
    constructor(
        public readonly quotationId: string,
        public readonly itemId: string,
        public readonly quantity: number,
        public readonly unitPrice: number,
        public readonly currency: string,
        public readonly discountPercentage: number
    ) {}
}

export class SubmitSalesQuotationCommand {
    constructor(public readonly quotationId: string) {}
}

export class AcceptSalesQuotationCommand {
    constructor(public readonly quotationId: string) {}
}

export class RejectSalesQuotationCommand {
    constructor(public readonly quotationId: string) {}
}

export class CreateSalesInvoiceCommand {
    constructor(
        public readonly salesOrderId: string,
        public readonly customerId: string,
        public readonly dueDate: Date,
        public readonly currency: string
    ) {}
}

export class AddSalesInvoiceLineCommand {
    constructor(
        public readonly invoiceId: string,
        public readonly itemId: string,
        public readonly description: string,
        public readonly quantity: number,
        public readonly unitPrice: number,
        public readonly currency: string,
        public readonly taxRatePercentage: number
    ) {}
}

export class IssueSalesInvoiceCommand {
    constructor(public readonly invoiceId: string) {}
}

export class CancelSalesInvoiceCommand {
    constructor(public readonly invoiceId: string) {}
}
