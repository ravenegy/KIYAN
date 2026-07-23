import { ISalesQuotationRepository } from '../../domain/repositories/ISalesQuotationRepository';
import { SalesQuotation } from '../../domain/aggregates/SalesQuotation';
import { SalesQuotationId } from '../../domain/value-objects';
import { SalesPersistenceMapper } from '../persistence/mappers/SalesPersistenceMapper';
import { SalesQuotationPersistenceModel } from '../persistence/models';

export class SalesQuotationRepository implements ISalesQuotationRepository {
    private readonly store = new Map<string, SalesQuotationPersistenceModel>();

    constructor(private readonly mapper: SalesPersistenceMapper) {}

    async findById(id: SalesQuotationId): Promise<SalesQuotation | null> {
        const model = this.store.get(id.value);
        if (!model) return null;
        return this.mapper.toSalesQuotationDomain(model);
    }

    async save(quotation: SalesQuotation): Promise<void> {
        const model = this.mapper.toSalesQuotationPersistence(quotation);
        this.store.set(model.id, model);
    }
}
