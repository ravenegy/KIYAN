import { DomainEvent } from '../../../../core/domain/events/DomainEvent';
import { InventoryItemId } from '../shared/InventoryItemId';
import { ItemCategory } from '../enums/ItemCategory';

export class InventoryItemCreatedEvent extends DomainEvent {
  constructor(
    eventId: string,
    public readonly itemId: InventoryItemId,
    public readonly sku: string,
    public readonly category: ItemCategory,
    occurredOn: Date,
    version: number = 1
  ) {
    super(eventId, 'InventoryItemCreatedEvent', occurredOn, itemId.value, 'InventoryItem', version);
    Object.freeze(this);
  }
}
