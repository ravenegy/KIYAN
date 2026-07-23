import { IDomainEvent } from '../events/IDomainEvent';

export interface IHasDomainEvents {
  readonly domainEvents: ReadonlyArray<IDomainEvent>;
  addDomainEvent(event: IDomainEvent): void;
  removeDomainEvent(event: IDomainEvent): void;
  clearDomainEvents(): void;
}
