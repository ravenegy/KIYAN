import { SalesOrder } from '../aggregates/SalesOrder';
import { SalesOrderId } from '../value-objects/Identifiers';

export interface ISalesOrderRepository {
    findById(id: SalesOrderId): Promise<SalesOrder | null>;
    save(order: SalesOrder): Promise<void>;
}
