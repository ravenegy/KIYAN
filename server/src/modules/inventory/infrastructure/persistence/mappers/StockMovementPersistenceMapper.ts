import { StockMovement } from '../../../domain/entities/StockMovement';
import { StockMovementPersistenceModel } from '../models/StockMovementPersistenceModel';
import { StockMovementId } from '../../../domain/shared/StockMovementId';
import { InventoryItemId } from '../../../domain/shared/InventoryItemId';
import { StockLocationId } from '../../../domain/shared/StockLocationId';
import { LotId } from '../../../domain/shared/LotId';
import { Quantity } from '../../../domain/value-objects/Quantity';
import { MovementType } from '../../../domain/enums/MovementType';

export class StockMovementPersistenceMapper {
  public toPersistence(entity: StockMovement): StockMovementPersistenceModel {
    return {
      id: entity.id.value,
      itemId: entity.inventoryItemId.value,
      locationId: entity.locationId.value,
      lotId: entity.lotId ? entity.lotId.value : null,
      quantity: entity.quantity.value,
      type: entity.type,
      reason: entity.reason,
      referenceId: entity.referenceId || null,
      createdAt: entity.createdAt
    };
  }

  public toDomain(model: StockMovementPersistenceModel): StockMovement {
    const id = StockMovementId.create(model.id).value!;
    const itemId = InventoryItemId.create(model.itemId).value!;
    const locationId = StockLocationId.create(model.locationId).value!;
    const lotId = model.lotId ? LotId.create(model.lotId).value : undefined;
    const quantity = Quantity.create(model.quantity).value!;
    const type = model.type as MovementType;

    return new StockMovement(
      id,
      itemId,
      type,
      quantity,
      locationId,
      model.reason,
      lotId,
      model.referenceId || undefined,
      model.createdAt
    );
  }
}
