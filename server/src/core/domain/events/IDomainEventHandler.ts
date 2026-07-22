import { IDomainEvent } from './IDomainEvent';

export interface IDomainEventHandler<TEvent extends IDomainEvent = IDomainEvent> {
  handle(event: TEvent): Promise<void>;
}
