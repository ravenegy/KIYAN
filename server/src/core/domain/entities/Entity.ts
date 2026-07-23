import { IDomainEvent } from '../events/IDomainEvent';
import { IHasDomainEvents } from '../shared/IHasDomainEvents';
import { IAuditable } from '../shared/IAuditable';
import { IVersioned } from '../shared/IVersioned';
import { StronglyTypedId } from './StronglyTypedId';

export abstract class Entity<TId extends StronglyTypedId<unknown>> implements IHasDomainEvents, IAuditable, IVersioned {
  public readonly id: TId;
  private readonly _domainEvents: IDomainEvent[] = [];
  
  public readonly createdAt: Date;
  public readonly createdBy?: string;
  public readonly updatedAt?: Date;
  public readonly updatedBy?: string;
  public readonly version: number;

  protected constructor(
    id: TId,
    createdAt: Date = new Date(),
    version: number = 1,
    createdBy?: string,
    updatedAt?: Date,
    updatedBy?: string
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.version = version;
    this.createdBy = createdBy;
    this.updatedAt = updatedAt;
    this.updatedBy = updatedBy;
  }

  public get domainEvents(): ReadonlyArray<IDomainEvent> {
    return Object.freeze([...this._domainEvents]);
  }

  public addDomainEvent(event: IDomainEvent): void {
    this._domainEvents.push(event);
  }

  public removeDomainEvent(event: IDomainEvent): void {
    const index = this._domainEvents.indexOf(event);
    if (index > -1) {
      this._domainEvents.splice(index, 1);
    }
  }

  public clearDomainEvents(): void {
    this._domainEvents.length = 0;
  }

  public equals(other?: Entity<TId>): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (this === other) {
      return true;
    }
    return this.id.equals(other.id);
  }
}
