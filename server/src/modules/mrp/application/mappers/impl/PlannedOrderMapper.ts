import { IPlannedOrderMapper } from '../IPlannedOrderMapper';
import { PlannedOrder } from '../../../domain/entities/PlannedOrder';
import { PlannedOrderDto } from '../../dto/PlannedOrderDto';

export class PlannedOrderMapper implements IPlannedOrderMapper {
  public toDto(plannedOrder: PlannedOrder): PlannedOrderDto {
    return {
      id: plannedOrder.id.value,
      itemId: plannedOrder.itemId,
      quantity: plannedOrder.quantity.value,
      startDate: plannedOrder.startDate.toISOString(),
      endDate: plannedOrder.endDate.toISOString(),
      type: plannedOrder.type,
      status: plannedOrder.status,
      mrpRunId: plannedOrder.mrpRunId,
      sourceRequirementId: plannedOrder.sourceRequirementId,
      version: plannedOrder.version
    };
  }
}
