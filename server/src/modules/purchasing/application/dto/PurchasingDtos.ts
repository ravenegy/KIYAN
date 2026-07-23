export interface PurchaseOrderLineDto {
    readonly id: string;
    readonly itemId: string;
    readonly quantity: number;
    readonly unitPrice: number;
    readonly expectedDeliveryDate: string;
    readonly receivedQuantity: number;
    readonly totalAmount: number;
}

export interface PurchaseOrderDto {
    readonly id: string;
    readonly supplierId: string;
    readonly expectedDeliveryDate: string;
    readonly notes: string;
    readonly status: string;
    readonly approvalStatus: string;
    readonly lines: readonly PurchaseOrderLineDto[];
    readonly totalAmount: number;
}

export interface SupplierDto {
    readonly id: string;
    readonly name: string;
    readonly contactEmail: string;
    readonly status: string;
    readonly qualificationLevel: string;
    readonly rating: number;
}

export interface RequestForQuotationDto {
    readonly id: string;
    readonly itemId: string;
    readonly requiredQuantity: number;
    readonly requiredByDate: string;
    readonly status: string;
    readonly targetSuppliers: readonly string[];
}

export interface QuotationDto {
    readonly id: string;
    readonly rfqId: string;
    readonly supplierId: string;
    readonly unitPrice: number;
    readonly leadTimeDays: number;
    readonly validUntil: string;
    readonly status: string;
}
