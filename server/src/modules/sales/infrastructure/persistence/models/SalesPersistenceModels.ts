export interface CustomerPersistenceModel {
    id: string;
    name: string;
    email: string;
    status: string;
    isEligibleForOrders: boolean;
}

export interface SalesOrderLinePersistenceModel {
    id: string;
    itemId: string;
    quantity: number;
    unitPrice: number;
    currency: string;
    discountPercentage: number;
    taxRatePercentage: number;
    totalAmount: number;
}

export interface SalesOrderPersistenceModel {
    id: string;
    customerId: string;
    status: string;
    currency: string;
    lines: SalesOrderLinePersistenceModel[];
    totalAmount: number;
}

export interface SalesQuotationLinePersistenceModel {
    id: string;
    itemId: string;
    quantity: number;
    unitPrice: number;
    currency: string;
    discountPercentage: number;
    totalAmount: number;
}

export interface SalesQuotationPersistenceModel {
    id: string;
    customerId: string;
    status: string;
    currency: string;
    validUntil: string;
    lines: SalesQuotationLinePersistenceModel[];
}

export interface SalesInvoiceLinePersistenceModel {
    id: string;
    itemId: string;
    description: string;
    quantity: number;
    unitPrice: number;
    currency: string;
    taxRatePercentage: number;
    totalAmount: number;
}

export interface SalesInvoicePersistenceModel {
    id: string;
    salesOrderId: string;
    customerId: string;
    status: string;
    currency: string;
    issuedAt: string | null;
    dueDate: string;
    totalAmount: number;
    lines: SalesInvoiceLinePersistenceModel[];
}
