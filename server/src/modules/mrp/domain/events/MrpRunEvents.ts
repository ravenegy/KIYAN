import { DomainEvent } from '../../../../core/domain/events/DomainEvent';
import { DomainEventMetadata } from '../../../../core/domain/events/DomainEventMetadata';

export class MrpRunStartedDomainEvent extends DomainEvent {
  constructor(
    public readonly mrpRunId: string,
    occurredOn: Date = new Date(),
    metadata?: DomainEventMetadata
  ) {
    super(
      `${mrpRunId}-started-${occurredOn.getTime()}`,
      'MrpRunStarted',
      occurredOn,
      mrpRunId,
      'MrpRun',
      1,
      metadata
    );
  }
}

export class MrpRunCompletedDomainEvent extends DomainEvent {
  constructor(
    public readonly mrpRunId: string,
    public readonly plannedOrdersCount: number,
    occurredOn: Date = new Date(),
    metadata?: DomainEventMetadata
  ) {
    super(
      `${mrpRunId}-completed-${occurredOn.getTime()}`,
      'MrpRunCompleted',
      occurredOn,
      mrpRunId,
      'MrpRun',
      1,
      metadata
    );
  }
}

export class MrpRunFailedDomainEvent extends DomainEvent {
  constructor(
    public readonly mrpRunId: string,
    public readonly reason: string,
    occurredOn: Date = new Date(),
    metadata?: DomainEventMetadata
  ) {
    super(
      `${mrpRunId}-failed-${occurredOn.getTime()}`,
      'MrpRunFailed',
      occurredOn,
      mrpRunId,
      'MrpRun',
      1,
      metadata
    );
  }
}
