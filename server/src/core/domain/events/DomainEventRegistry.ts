import { IDomainEvent } from './IDomainEvent';
import { IDomainEventHandler } from './IDomainEventHandler';
import { EventHandlerRegistration } from './EventHandlerRegistration';
import { EventPriority } from './EventPriority';
import { EventExecutionMode } from './EventExecutionMode';

export class DomainEventRegistry {
  private readonly handlers: Map<string, EventHandlerRegistration<IDomainEvent>[]> = new Map();

  public register<TEvent extends IDomainEvent>(
    eventType: string,
    handler: IDomainEventHandler<TEvent>,
    priority: EventPriority = EventPriority.Normal,
    executionMode: EventExecutionMode = EventExecutionMode.Sync
  ): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    
    const eventHandlers = this.handlers.get(eventType)!;
    // Don't add if it's already registered
    if (!eventHandlers.some(r => r.handler === handler)) {
      eventHandlers.push({
        handler: handler as IDomainEventHandler<IDomainEvent>,
        priority,
        executionMode
      });
      // Sort by priority after adding
      this.sortHandlers(eventHandlers);
    }
  }

  public unregister<TEvent extends IDomainEvent>(eventType: string, handler: IDomainEventHandler<TEvent>): void {
    const eventHandlers = this.handlers.get(eventType);
    if (eventHandlers) {
      const index = eventHandlers.findIndex(r => r.handler === handler);
      if (index !== -1) {
        eventHandlers.splice(index, 1);
      }
    }
  }

  public getHandlers(eventType: string): ReadonlyArray<EventHandlerRegistration<IDomainEvent>> {
    return this.handlers.get(eventType) || [];
  }

  public clear(): void {
    this.handlers.clear();
  }

  private sortHandlers(handlers: EventHandlerRegistration<IDomainEvent>[]): void {
    const priorityWeights: Record<EventPriority, number> = {
      [EventPriority.Critical]: 4,
      [EventPriority.High]: 3,
      [EventPriority.Normal]: 2,
      [EventPriority.Low]: 1
    };

    handlers.sort((a, b) => priorityWeights[b.priority] - priorityWeights[a.priority]);
  }
}
