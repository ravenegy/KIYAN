import { IDomainEvent } from './IDomainEvent';
import { IDomainEventHandler } from './IDomainEventHandler';
import { EventPriority } from './EventPriority';
import { EventExecutionMode } from './EventExecutionMode';

export interface IDomainEventDispatcher {
  publish(event: IDomainEvent): Promise<void>;
  publishMany(events: IDomainEvent[]): Promise<void>;
  register<TEvent extends IDomainEvent>(
    eventType: string,
    handler: IDomainEventHandler<TEvent>,
    priority?: EventPriority,
    executionMode?: EventExecutionMode
  ): void;
  unregister<TEvent extends IDomainEvent>(eventType: string, handler: IDomainEventHandler<TEvent>): void;
  clear(): void;
}
