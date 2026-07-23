import { DomainEvent } from '../../../../core/domain/events/DomainEvent';
import { DomainEventMetadata } from '../../../../core/domain/events/DomainEventMetadata';

export class ProductionOrderCreated extends DomainEvent {
  constructor(
    eventId: string,
    occurredOn: Date,
    aggregateId: string,
    version: number,
    public readonly targetItemId: string,
    public readonly plannedQuantity: number,
    public readonly startDate: Date,
    public readonly endDate: Date,
    metadata?: DomainEventMetadata
  ) {
    super(eventId, 'ProductionOrderCreated', occurredOn, aggregateId, 'ProductionOrder', version, metadata);
  }
}

export class ProductionOrderReleased extends DomainEvent {
  constructor(
    eventId: string,
    occurredOn: Date,
    aggregateId: string,
    version: number,
    metadata?: DomainEventMetadata
  ) {
    super(eventId, 'ProductionOrderReleased', occurredOn, aggregateId, 'ProductionOrder', version, metadata);
  }
}

export class ProductionStarted extends DomainEvent {
  constructor(
    eventId: string,
    occurredOn: Date,
    aggregateId: string,
    version: number,
    public readonly actualStartDate: Date,
    metadata?: DomainEventMetadata
  ) {
    super(eventId, 'ProductionStarted', occurredOn, aggregateId, 'ProductionOrder', version, metadata);
  }
}

export class ProductionCompleted extends DomainEvent {
  constructor(
    eventId: string,
    occurredOn: Date,
    aggregateId: string,
    version: number,
    public readonly actualEndDate: Date,
    public readonly totalProducedQuantity: number,
    metadata?: DomainEventMetadata
  ) {
    super(eventId, 'ProductionCompleted', occurredOn, aggregateId, 'ProductionOrder', version, metadata);
  }
}

export class ProductionCancelled extends DomainEvent {
  constructor(
    eventId: string,
    occurredOn: Date,
    aggregateId: string,
    version: number,
    public readonly reason: string,
    metadata?: DomainEventMetadata
  ) {
    super(eventId, 'ProductionCancelled', occurredOn, aggregateId, 'ProductionOrder', version, metadata);
  }
}

export class MaterialIssued extends DomainEvent {
  constructor(
    eventId: string,
    occurredOn: Date,
    aggregateId: string,
    version: number,
    public readonly materialIssueId: string,
    public readonly itemId: string,
    public readonly quantity: number,
    metadata?: DomainEventMetadata
  ) {
    super(eventId, 'MaterialIssued', occurredOn, aggregateId, 'ProductionOrder', version, metadata);
  }
}

export class FinishedGoodsReceived extends DomainEvent {
  constructor(
    eventId: string,
    occurredOn: Date,
    aggregateId: string,
    version: number,
    public readonly receiptId: string,
    public readonly itemId: string,
    public readonly quantity: number,
    metadata?: DomainEventMetadata
  ) {
    super(eventId, 'FinishedGoodsReceived', occurredOn, aggregateId, 'ProductionOrder', version, metadata);
  }
}

export class OperationStatusChanged extends DomainEvent {
  constructor(
    eventId: string,
    occurredOn: Date,
    aggregateId: string,
    version: number,
    public readonly operationId: string,
    public readonly newStatus: string,
    metadata?: DomainEventMetadata
  ) {
    super(eventId, 'OperationStatusChanged', occurredOn, aggregateId, 'ProductionOrder', version, metadata);
  }
}
