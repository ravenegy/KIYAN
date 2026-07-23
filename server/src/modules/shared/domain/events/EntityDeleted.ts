import { IDomainEvent } from '../../../../core/domain/events/IDomainEvent';

export class EntityDeleted implements IDomainEvent {
  public readonly eventId: string;
  public readonly occurredOn: Date;
  public readonly eventType: string = 'EntityDeleted';
  public readonly version: number = 1;
  
  constructor(
    public readonly aggregateId: string, 
    public readonly aggregateType: string,
    public readonly payload: Record<string, unknown> = {},
    public readonly metadata?: any
  ) {
    this.eventId = crypto.randomUUID();
    this.occurredOn = new Date();
  }
}
