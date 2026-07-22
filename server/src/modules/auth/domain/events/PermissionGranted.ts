import { DomainEvent } from '../../../../core/domain/events/DomainEvent';
import { DomainEventMetadata } from '../../../../core/domain/events/DomainEventMetadata';

export class PermissionGranted extends DomainEvent {
  constructor(
    aggregateId: string, 
    aggregateType: string,
    public readonly payload: Record<string, unknown> = {},
    metadata?: DomainEventMetadata
  ) {
    super(
      crypto.randomUUID(),
      'PermissionGranted',
      new Date(),
      aggregateId,
      aggregateType,
      1,
      metadata
    );
  }
}
