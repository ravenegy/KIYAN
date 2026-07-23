import { Quotation } from '../entities';
import { QuotationId, RfqId } from '../shared';

export interface IQuotationRepository {
    findById(id: QuotationId): Promise<Quotation | null>;
    findByRfqId(rfqId: RfqId): Promise<readonly Quotation[]>;
    save(quotation: Quotation): Promise<void>;
}
