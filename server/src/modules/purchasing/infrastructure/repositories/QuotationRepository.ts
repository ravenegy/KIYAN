import { IQuotationRepository } from '../../domain/repositories';
import { Quotation } from '../../domain/entities';
import { QuotationId, RfqId } from '../../domain/shared';
import { PurchasingPersistenceMapper } from '../persistence/mappers';
import { QuotationPersistenceModel } from '../persistence/models';

export class QuotationRepository implements IQuotationRepository {
    private readonly store = new Map<string, QuotationPersistenceModel>();

    constructor(private readonly mapper: PurchasingPersistenceMapper) {}

    async findById(id: QuotationId): Promise<Quotation | null> {
        const model = this.store.get(id.value);
        if (!model) return null;
        return this.mapper.toQuotationDomain(model);
    }

    async findByRfqId(rfqId: RfqId): Promise<readonly Quotation[]> {
        return Array.from(this.store.values())
            .filter(m => m.rfqId === rfqId.value)
            .map(m => this.mapper.toQuotationDomain(m));
    }

    async save(quotation: Quotation): Promise<void> {
        const model = this.mapper.toQuotationPersistence(quotation);
        this.store.set(model.id, model);
    }
}
