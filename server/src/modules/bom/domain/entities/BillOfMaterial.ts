import { AggregateRoot } from '../../../../core/domain/entities/AggregateRoot';
import { BomId } from '../shared/BomId';
import { ItemId } from '../shared/ItemId';
import { Version } from '../value-objects/Version';
import { BomStatus } from '../enums/BomStatus';
import { BomComponent } from './BomComponent';
import { BomCreatedEvent } from '../events/BomCreatedEvent';
import { BomActivatedEvent } from '../events/BomActivatedEvent';
import { Result } from '../../../../core/results/Result';

export class BillOfMaterial extends AggregateRoot<BomId> {
  private _name: string;
  private _targetItemId: ItemId;
  private _status: BomStatus;
  private _version: Version;
  private _components: Map<string, BomComponent> = new Map();

  private constructor(
    id: BomId,
    name: string,
    targetItemId: ItemId,
    status: BomStatus,
    version: Version,
    createdAt: Date,
    aggregateVersion: number
  ) {
    super(id, createdAt, aggregateVersion);
    this._name = name;
    this._targetItemId = targetItemId;
    this._status = status;
    this._version = version;
  }

  public get name(): string { return this._name; }
  public get targetItemId(): ItemId { return this._targetItemId; }
  public get status(): BomStatus { return this._status; }
  public get bomVersion(): Version { return this._version; }
  public get components(): ReadonlyArray<BomComponent> {
    return Array.from(this._components.values());
  }

  public addComponent(component: BomComponent): Result<void> {
    if (this._status !== BomStatus.Draft) {
      return Result.failure({ code: 'BOM_NOT_DRAFT', message: 'Can only add components to a Draft BOM.' });
    }
    if (this._targetItemId.equals(component.itemId)) {
      return Result.failure({ code: 'BOM_CIRCULAR_REF', message: 'BOM target item cannot be its own component.' });
    }
    if (this._components.has(component.itemId.value)) {
      return Result.failure({ code: 'BOM_DUPLICATE_COMPONENT', message: 'BOM already contains this component item.' });
    }
    this._components.set(component.itemId.value, component);
    return Result.success();
  }

  public removeComponent(itemId: ItemId): Result<void> {
    if (this._status !== BomStatus.Draft) {
      return Result.failure({ code: 'BOM_NOT_DRAFT', message: 'Can only remove components from a Draft BOM.' });
    }
    if (!this._components.has(itemId.value)) {
      return Result.failure({ code: 'BOM_COMPONENT_NOT_FOUND', message: 'Component not found in this BOM.' });
    }
    this._components.delete(itemId.value);
    return Result.success();
  }

  public activate(): Result<void> {
    if (this._components.size === 0) {
      return Result.failure({ code: 'BOM_EMPTY', message: 'Cannot activate a BOM with no components.' });
    }
    this._status = BomStatus.Active;
    this.addDomainEvent(new BomActivatedEvent(this.id, this.bomVersion.value));
    return Result.success();
  }

  public archive(): void {
    this._status = BomStatus.Archived;
  }

  public static create(
    id: BomId,
    name: string,
    targetItemId: ItemId
  ): Result<BillOfMaterial> {
    const versionResult = Version.create(1);
    if (versionResult.isFailure) {
      return Result.failure(versionResult.error!);
    }
    
    const bom = new BillOfMaterial(id, name, targetItemId, BomStatus.Draft, versionResult.value!, new Date(), 1);
    bom.addDomainEvent(new BomCreatedEvent(targetItemId.value, id));
    return Result.success(bom);
  }
}
