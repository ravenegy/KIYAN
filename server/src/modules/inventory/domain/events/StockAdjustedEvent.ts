import { DomainEvent } from '../../../../core/domain/events/DomainEvent';
import { InventoryItemId } from '../shared/InventoryItemId';
import { StockLocationId } from '../shared/StockLocationId';

export class StockAdjustedEvent extends DomainEvent {
  constructor(
    eventId: string,
    public readonly itemId: InventoryItemId,
    public readonly locationId: StockLocationId,
    public readonly oldQuantity: number,
    public readonly newQuantity: number,
    public readonly reason: string,
    occurredOn: Date,
    version: number = 1
  ) {
    super(eventId, 'StockAdjustedEvent', occurredOn, itemId.value, 'InventoryItem', version);
    Object.freeze(this);
  }
}
