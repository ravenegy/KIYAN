import { DomainEventMetadata } from './DomainEventMetadata';

export interface IDomainEvent {
  readonly eventId: string;
  readonly occurredOn: Date;
  readonly eventType: string;
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly version: number;
  readonly metadata?: DomainEventMetadata;
}
