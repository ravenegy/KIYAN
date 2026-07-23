import { ISalesInvoiceRepository } from '../../domain/repositories/ISalesInvoiceRepository';
import { SalesInvoice } from '../../domain/aggregates/SalesInvoice';
import { SalesInvoiceId } from '../../domain/value-objects';
import { SalesPersistenceMapper } from '../persistence/mappers/SalesPersistenceMapper';
import { SalesInvoicePersistenceModel } from '../persistence/models';

export class SalesInvoiceRepository implements ISalesInvoiceRepository {
    private readonly store = new Map<string, SalesInvoicePersistenceModel>();

    constructor(private readonly mapper: SalesPersistenceMapper) {}

    async findById(id: SalesInvoiceId): Promise<SalesInvoice | null> {
        const model = this.store.get(id.value);
        if (!model) return null;
        return this.mapper.toSalesInvoiceDomain(model);
    }

    async save(invoice: SalesInvoice): Promise<void> {
        const model = this.mapper.toSalesInvoicePersistence(invoice);
        this.store.set(model.id, model);
    }
}
