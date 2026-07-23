import { PlannedOrder } from '../../../domain/entities/PlannedOrder';
import { PlannedOrderId } from '../../../domain/shared/PlannedOrderId';
import { PlannedOrderStatus } from '../../../domain/enums/PlannedOrderStatus';
import { PlannedOrderType } from '../../../domain/enums/PlannedOrderType';
import { Quantity } from '../../../domain/value-objects/Quantity';
import { PlannedOrderPersistenceModel } from '../models/PlannedOrderPersistenceModel';

export class PlannedOrderPersistenceMapper {
  public static toDomain(model: PlannedOrderPersistenceModel): PlannedOrder {
    const idResult = PlannedOrderId.create(model.id);
    if (idResult.isFailure) throw new Error(idResult.error?.message);
    const id = idResult.value!;
    
    const quantityResult = Quantity.create(model.quantity);
    if (quantityResult.isFailure) throw new Error(quantityResult.error?.message);

    const orderResult = PlannedOrder.create(id, {
      itemId: model.itemId,
      quantity: quantityResult.value!,
      startDate: model.startDate,
      endDate: model.endDate,
      type: model.type as PlannedOrderType,
      mrpRunId: model.mrpRunId,
      sourceRequirementId: model.sourceRequirementId || undefined,
      status: model.status as PlannedOrderStatus,
    });

    if (orderResult.isFailure) {
      throw new Error(`Failed to map Planned Order: ${orderResult.error?.message}`);
    }

    const order = orderResult.value!;
    order.clearDomainEvents();
    return order;
  }

  public static toPersistence(domain: PlannedOrder): PlannedOrderPersistenceModel {
    return {
      id: domain.id.value,
      itemId: domain.itemId,
      quantity: domain.quantity.value,
      startDate: domain.startDate,
      endDate: domain.endDate,
      type: domain.type,
      status: domain.status,
      mrpRunId: domain.mrpRunId,
      sourceRequirementId: domain.sourceRequirementId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
