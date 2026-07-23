import { ISalesOrderRepository } from '../../domain/repositories/ISalesOrderRepository';
import { SalesOrder } from '../../domain/aggregates/SalesOrder';
import { SalesOrderId } from '../../domain/value-objects';
import { SalesPersistenceMapper } from '../persistence/mappers/SalesPersistenceMapper';
import { SalesOrderPersistenceModel } from '../persistence/models';

export class SalesOrderRepository implements ISalesOrderRepository {
    private readonly store = new Map<string, SalesOrderPersistenceModel>();

    constructor(private readonly mapper: SalesPersistenceMapper) {}

    async findById(id: SalesOrderId): Promise<SalesOrder | null> {
        const model = this.store.get(id.value);
        if (!model) return null;
        return this.mapper.toSalesOrderDomain(model);
    }

    async save(order: SalesOrder): Promise<void> {
        const model = this.mapper.toSalesOrderPersistence(order);
        this.store.set(model.id, model);
    }
}
