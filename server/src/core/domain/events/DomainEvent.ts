import { IDomainEvent } from './IDomainEvent';
import { DomainEventMetadata } from './DomainEventMetadata';

export abstract class DomainEvent implements IDomainEvent {
  public readonly eventId: string;
  public readonly eventType: string;
  public readonly occurredOn: Date;
  public readonly aggregateId: string;
  public readonly aggregateType: string;
  public readonly version: number;
  public readonly metadata?: DomainEventMetadata;

  protected constructor(
    eventId: string,
    eventType: string,
    occurredOn: Date,
    aggregateId: string,
    aggregateType: string,
    version: number,
    metadata?: DomainEventMetadata
  ) {
    this.eventId = eventId;
    this.eventType = eventType;
    this.occurredOn = occurredOn;
    this.aggregateId = aggregateId;
    this.aggregateType = aggregateType;
    this.version = version;
    this.metadata = metadata;
  }
}
