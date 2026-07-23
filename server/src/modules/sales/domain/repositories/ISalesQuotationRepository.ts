import { SalesQuotation } from '../aggregates/SalesQuotation';
import { SalesQuotationId } from '../value-objects/Identifiers';

export interface ISalesQuotationRepository {
    findById(id: SalesQuotationId): Promise<SalesQuotation | null>;
    save(quotation: SalesQuotation): Promise<void>;
}
