import { DomainEvent } from '../../../../core/domain/events/DomainEvent';
import { DomainEventMetadata } from '../../../../core/domain/events/DomainEventMetadata';

export class PlannedOrderCreatedDomainEvent extends DomainEvent {
  constructor(
    public readonly plannedOrderId: string,
    public readonly itemId: string,
    public readonly quantity: number,
    public readonly type: string,
    occurredOn: Date = new Date(),
    metadata?: DomainEventMetadata
  ) {
    super(
      `${plannedOrderId}-created-${occurredOn.getTime()}`,
      'PlannedOrderCreated',
      occurredOn,
      plannedOrderId,
      'PlannedOrder',
      1,
      metadata
    );
  }
}

export class PlannedOrderFirmedDomainEvent extends DomainEvent {
  constructor(
    public readonly plannedOrderId: string,
    occurredOn: Date = new Date(),
    metadata?: DomainEventMetadata
  ) {
    super(
      `${plannedOrderId}-firmed-${occurredOn.getTime()}`,
      'PlannedOrderFirmed',
      occurredOn,
      plannedOrderId,
      'PlannedOrder',
      1,
      metadata
    );
  }
}

export class PlannedOrderReleasedDomainEvent extends DomainEvent {
  constructor(
    public readonly plannedOrderId: string,
    occurredOn: Date = new Date(),
    metadata?: DomainEventMetadata
  ) {
    super(
      `${plannedOrderId}-released-${occurredOn.getTime()}`,
      'PlannedOrderReleased',
      occurredOn,
      plannedOrderId,
      'PlannedOrder',
      1,
      metadata
    );
  }
}

export class PlannedOrderCancelledDomainEvent extends DomainEvent {
  constructor(
    public readonly plannedOrderId: string,
    public readonly reason: string,
    occurredOn: Date = new Date(),
    metadata?: DomainEventMetadata
  ) {
    super(
      `${plannedOrderId}-cancelled-${occurredOn.getTime()}`,
      'PlannedOrderCancelled',
      occurredOn,
      plannedOrderId,
      'PlannedOrder',
      1,
      metadata
    );
  }
}
