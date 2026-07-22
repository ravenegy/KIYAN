import { IDomainEventHandler } from './IDomainEventHandler';
import { IDomainEvent } from './IDomainEvent';
import { EventPriority } from './EventPriority';
import { EventExecutionMode } from './EventExecutionMode';

export interface EventHandlerRegistration<TEvent extends IDomainEvent = IDomainEvent> {
  handler: IDomainEventHandler<TEvent>;
  priority: EventPriority;
  executionMode: EventExecutionMode;
}
