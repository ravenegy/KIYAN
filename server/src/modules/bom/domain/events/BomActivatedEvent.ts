import { DomainEvent } from '../../../../core/domain/events/DomainEvent';
import { BomId } from '../shared/BomId';

export class BomActivatedEvent extends DomainEvent {
  constructor(
    bomId: BomId,
    version: number
  ) {
    super(
      'BOM_ACTIVATED',
      'BomActivatedEvent',
      new Date(),
      bomId.value,
      'BillOfMaterial',
      version
    );
  }
}
