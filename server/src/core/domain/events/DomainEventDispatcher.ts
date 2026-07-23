import { IDomainEvent } from './IDomainEvent';
import { IDomainEventHandler } from './IDomainEventHandler';
import { IDomainEventDispatcher } from './IDomainEventDispatcher';
import { DomainEventRegistry } from './DomainEventRegistry';
import { EventPriority } from './EventPriority';
import { EventExecutionMode } from './EventExecutionMode';

export class DomainEventDispatcher implements IDomainEventDispatcher {
  constructor(private readonly registry: DomainEventRegistry) {}

  public async publish(event: IDomainEvent): Promise<void> {
    const handlers = this.registry.getHandlers(event.eventType);
    
    const syncHandlers = handlers.filter(h => h.executionMode === EventExecutionMode.Sync);
    const asyncHandlers = handlers.filter(h => h.executionMode === EventExecutionMode.Async);

    // Execute sync handlers sequentially
    for (const registration of syncHandlers) {
      await registration.handler.handle(event);
    }

    // Execute async handlers in parallel without waiting (fire and forget pattern if needed)
    // Here we await all async handlers in a Promise.all to ensure they start, but we could handle them differently depending on exact async requirement.
    // Assuming "Async" means run concurrently.
    if (asyncHandlers.length > 0) {
      const asyncPromises = asyncHandlers.map(registration => {
        return registration.handler.handle(event).catch(err => {
          // In a real system, you'd log this or send to a dead-letter queue.
          // For now we just log it to avoid unhandled promise rejections crashing the process.
          console.error(`Error executing async handler for event ${event.eventType}:`, err);
        });
      });
      // Optionally wait for them or fire and forget.
      // Usually, in-process async means we at least start them. 
      // We'll await them here for consistency unless true fire-and-forget is required.
      await Promise.all(asyncPromises);
    }
  }

  public async publishMany(events: IDomainEvent[]): Promise<void> {
    for (const event of events) {
      await this.publish(event);
    }
  }

  public register<TEvent extends IDomainEvent>(
    eventType: string,
    handler: IDomainEventHandler<TEvent>,
    priority?: EventPriority,
    executionMode?: EventExecutionMode
  ): void {
    this.registry.register(eventType, handler, priority, executionMode);
  }

  public unregister<TEvent extends IDomainEvent>(eventType: string, handler: IDomainEventHandler<TEvent>): void {
    this.registry.unregister(eventType, handler);
  }

  public clear(): void {
    this.registry.clear();
  }
}
