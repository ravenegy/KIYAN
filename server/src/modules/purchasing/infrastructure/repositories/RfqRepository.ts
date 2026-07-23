import { IRfqRepository } from '../../domain/repositories';
import { RequestForQuotation } from '../../domain/entities';
import { RfqId } from '../../domain/shared';
import { PurchasingPersistenceMapper } from '../persistence/mappers';
import { RfqPersistenceModel } from '../persistence/models';

export class RfqRepository implements IRfqRepository {
    private readonly store = new Map<string, RfqPersistenceModel>();

    constructor(private readonly mapper: PurchasingPersistenceMapper) {}

    async findById(id: RfqId): Promise<RequestForQuotation | null> {
        const model = this.store.get(id.value);
        if (!model) return null;
        return this.mapper.toRfqDomain(model);
    }

    async save(rfq: RequestForQuotation): Promise<void> {
        const model = this.mapper.toRfqPersistence(rfq);
        this.store.set(model.id, model);
    }

    async findAll(): Promise<readonly RequestForQuotation[]> {
        return Array.from(this.store.values()).map(m => this.mapper.toRfqDomain(m));
    }
}
