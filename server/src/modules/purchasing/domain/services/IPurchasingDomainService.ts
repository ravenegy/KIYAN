import { PurchaseOrder, Quotation, RequestForQuotation } from '../entities';

export interface IPurchasingDomainService {
    createPurchaseOrderFromQuotation(quotation: Quotation, rfq: RequestForQuotation): PurchaseOrder;
    evaluateQuotations(rfqId: string): Promise<Quotation[]>;
}
