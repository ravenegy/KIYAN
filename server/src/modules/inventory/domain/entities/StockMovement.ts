import { Entity } from '../../../../core/domain/entities/Entity';
import { StockMovementId } from '../shared/StockMovementId';
import { InventoryItemId } from '../shared/InventoryItemId';
import { StockLocationId } from '../shared/StockLocationId';
import { LotId } from '../shared/LotId';
import { Quantity } from '../value-objects/Quantity';
import { MovementType } from '../enums/MovementType';

export class StockMovement extends Entity<StockMovementId> {
  constructor(
    id: StockMovementId,
    public readonly inventoryItemId: InventoryItemId,
    public readonly type: MovementType,
    public readonly quantity: Quantity,
    public readonly locationId: StockLocationId,
    public readonly reason: string,
    public readonly lotId?: LotId,
    public readonly referenceId?: string,
    createdAt: Date = new Date(),
    version: number = 1
  ) {
    super(id, createdAt, version);
  }
}
