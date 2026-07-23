import { IRepository } from '../../../../core/domain/repositories/IRepository';
import { PlannedOrder } from '../entities/PlannedOrder';
import { PlannedOrderId } from '../shared/PlannedOrderId';

export interface IPlannedOrderRepository extends IRepository<PlannedOrder, PlannedOrderId> {
  findByMrpRunId(mrpRunId: string): Promise<PlannedOrder[]>;
  findByItemId(itemId: string): Promise<PlannedOrder[]>;
  deleteDraftOrdersByMrpRunId(mrpRunId: string): Promise<void>;
}
