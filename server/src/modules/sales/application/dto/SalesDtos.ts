export interface SalesOrderLineDto {
    readonly id: string;
    readonly itemId: string;
    readonly quantity: number;
    readonly unitPrice: number;
    readonly currency: string;
    readonly discountPercentage: number;
    readonly taxRatePercentage: number;
    readonly totalAmount: number;
}

export interface SalesOrderDto {
    readonly id: string;
    readonly customerId: string;
    readonly status: string;
    readonly currency: string;
    readonly lines: readonly SalesOrderLineDto[];
    readonly totalAmount: number;
}

export interface CustomerDto {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly status: string;
    readonly isEligibleForOrders: boolean;
}

export interface SalesQuotationLineDto {
    readonly id: string;
    readonly itemId: string;
    readonly quantity: number;
    readonly unitPrice: number;
    readonly currency: string;
    readonly discountPercentage: number;
    readonly totalAmount: number;
}

export interface SalesQuotationDto {
    readonly id: string;
    readonly customerId: string;
    readonly status: string;
    readonly currency: string;
    readonly validUntil: string;
    readonly lines: readonly SalesQuotationLineDto[];
}

export interface SalesInvoiceLineDto {
    readonly id: string;
    readonly itemId: string;
    readonly description: string;
    readonly quantity: number;
    readonly unitPrice: number;
    readonly currency: string;
    readonly taxRatePercentage: number;
    readonly totalAmount: number;
}

export interface SalesInvoiceDto {
    readonly id: string;
    readonly salesOrderId: string;
    readonly customerId: string;
    readonly status: string;
    readonly currency: string;
    readonly issuedAt: string | null;
    readonly dueDate: string;
    readonly lines: readonly SalesInvoiceLineDto[];
    readonly totalAmount: number;
}
