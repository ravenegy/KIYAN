import { PurchaseOrder } from '../entities';
import { PurchaseOrderId } from '../shared';

export interface IPurchaseOrderRepository {
    findById(id: PurchaseOrderId): Promise<PurchaseOrder | null>;
    save(order: PurchaseOrder): Promise<void>;
    findAll(): Promise<readonly PurchaseOrder[]>;
}
