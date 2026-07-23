import { Result } from '../../../core/results/Result';
import { 
    PurchaseOrderDto, 
    SupplierDto, 
    RequestForQuotationDto, 
    QuotationDto 
} from '../application/dto';

export interface IPurchasingIntegrationService {
    // Purchase Orders
    createPurchaseOrder(supplierId: string, expectedDeliveryDate: Date, notes: string): Promise<Result<string>>;
    getPurchaseOrder(orderId: string): Promise<Result<PurchaseOrderDto>>;
    getPurchaseOrders(status?: string, supplierId?: string): Promise<Result<readonly PurchaseOrderDto[]>>;
    submitPurchaseOrder(orderId: string): Promise<Result<void>>;
    approvePurchaseOrder(orderId: string, approvedBy: string): Promise<Result<void>>;
    rejectPurchaseOrder(orderId: string): Promise<Result<void>>;
    cancelPurchaseOrder(orderId: string, reason: string): Promise<Result<void>>;
    issuePurchaseOrder(orderId: string): Promise<Result<void>>;
    receiveGoods(orderId: string, lineId: string, quantity: number): Promise<Result<void>>;

    // Suppliers
    createSupplier(name: string, contactEmail: string): Promise<Result<string>>;
    qualifySupplier(supplierId: string, qualificationLevel: string): Promise<Result<void>>;
    suspendSupplier(supplierId: string): Promise<Result<void>>;
    getSupplier(supplierId: string): Promise<Result<SupplierDto>>;
    getSuppliers(status?: string, qualificationLevel?: string): Promise<Result<readonly SupplierDto[]>>;

    // RFQs
    createRfq(itemId: string, requiredQuantity: number, requiredByDate: Date): Promise<Result<string>>;
    addTargetSupplier(rfqId: string, supplierId: string): Promise<Result<void>>;
    publishRfq(rfqId: string): Promise<Result<void>>;
    getRfq(rfqId: string): Promise<Result<RequestForQuotationDto>>;
    getRfqs(status?: string): Promise<Result<readonly RequestForQuotationDto[]>>;

    // Quotations
    submitQuotation(rfqId: string, supplierId: string, unitPrice: number, leadTimeDays: number, validUntil: Date): Promise<Result<string>>;
    acceptQuotation(quotationId: string): Promise<Result<void>>;
    getQuotationsByRfq(rfqId: string): Promise<Result<readonly QuotationDto[]>>;
}
