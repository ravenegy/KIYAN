import { SalesInvoice } from '../aggregates/SalesInvoice';
import { SalesInvoiceId } from '../value-objects/Identifiers';

export interface ISalesInvoiceRepository {
    findById(id: SalesInvoiceId): Promise<SalesInvoice | null>;
    save(invoice: SalesInvoice): Promise<void>;
}
