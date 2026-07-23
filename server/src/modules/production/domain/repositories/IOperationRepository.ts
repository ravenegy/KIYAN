import { ProductionOperation } from '../entities/ProductionOperation';
import { OperationId } from '../shared/OperationId';
import { ProductionOrderId } from '../shared/ProductionOrderId';

export interface IOperationRepository {
  findById(id: OperationId): Promise<ProductionOperation | null>;
  findByProductionOrderId(productionOrderId: ProductionOrderId): Promise<ProductionOperation[]>;
}
