import { ProductionOrder } from '../entities/ProductionOrder';
import { ProductionOrderId } from '../shared/ProductionOrderId';

export interface IProductionOrderRepository {
  findById(id: ProductionOrderId): Promise<ProductionOrder | null>;
  save(order: ProductionOrder): Promise<void>;
  findByStatus(status: string): Promise<ProductionOrder[]>;
  findByTargetItemId(itemId: string): Promise<ProductionOrder[]>;
}
