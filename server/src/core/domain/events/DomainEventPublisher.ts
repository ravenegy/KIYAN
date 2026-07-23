import { IDomainEventDispatcher } from './IDomainEventDispatcher';
import { IHasDomainEvents } from '../shared/IHasDomainEvents';

export class DomainEventPublisher {
  constructor(private readonly dispatcher: IDomainEventDispatcher) {}

  public async publishAggregateEvents(aggregate: IHasDomainEvents): Promise<void> {
    const events = [...aggregate.domainEvents];
    if (events.length > 0) {
      await this.dispatcher.publishMany(events);
      aggregate.clearDomainEvents();
    }
  }
  
  public async publishMultipleAggregateEvents(aggregates: IHasDomainEvents[]): Promise<void> {
    for (const aggregate of aggregates) {
      await this.publishAggregateEvents(aggregate);
    }
  }
}
