import { IPurchaseOrderRepository } from '../../domain/repositories';
import { PurchaseOrder } from '../../domain/entities';
import { PurchaseOrderId } from '../../domain/shared';
import { PurchasingPersistenceMapper } from '../persistence/mappers';
import { PurchaseOrderPersistenceModel } from '../persistence/models';

export class PurchaseOrderRepository implements IPurchaseOrderRepository {
    private readonly store = new Map<string, PurchaseOrderPersistenceModel>();

    constructor(private readonly mapper: PurchasingPersistenceMapper) {}

    async findById(id: PurchaseOrderId): Promise<PurchaseOrder | null> {
        const model = this.store.get(id.value);
        if (!model) return null;
        return this.mapper.toPurchaseOrderDomain(model);
    }

    async save(order: PurchaseOrder): Promise<void> {
        const model = this.mapper.toPurchaseOrderPersistence(order);
        this.store.set(model.id, model);
    }

    async findAll(): Promise<readonly PurchaseOrder[]> {
        return Array.from(this.store.values()).map(m => this.mapper.toPurchaseOrderDomain(m));
    }
}
