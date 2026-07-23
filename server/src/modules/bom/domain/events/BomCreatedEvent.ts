import { DomainEvent } from '../../../../core/domain/events/DomainEvent';
import { BomId } from '../shared/BomId';

export class BomCreatedEvent extends DomainEvent {
  constructor(
    public readonly targetItemId: string,
    bomId: BomId
  ) {
    super(
      'BOM_CREATED',
      'BomCreatedEvent',
      new Date(),
      bomId.value,
      'BillOfMaterial',
      1
    );
  }
}
