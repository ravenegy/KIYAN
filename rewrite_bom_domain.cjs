const fs = require('fs');
const path = require('path');

const modDir = path.join(__dirname, 'server/src/modules/bom/domain');
function write(subpath, content) {
    const dir = path.dirname(path.join(modDir, subpath));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(modDir, subpath), content.trim() + '\n');
}

// 1. Enums
write('enums/BomStatus.ts', `export enum BomStatus {
  Draft = 'DRAFT',
  Active = 'ACTIVE',
  Archived = 'ARCHIVED'
}`);
write('enums/index.ts', `export * from './BomStatus';`);

// 2. Shared Types (Strongly Typed Ids)
write('shared/BomId.ts', `import { StronglyTypedId } from '../../../core/domain/entities/StronglyTypedId';

export class BomId extends StronglyTypedId<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): BomId {
    return new BomId(value);
  }
}`);
write('shared/BomComponentId.ts', `import { StronglyTypedId } from '../../../core/domain/entities/StronglyTypedId';

export class BomComponentId extends StronglyTypedId<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): BomComponentId {
    return new BomComponentId(value);
  }
}`);
write('shared/ItemId.ts', `import { StronglyTypedId } from '../../../core/domain/entities/StronglyTypedId';

export class ItemId extends StronglyTypedId<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): ItemId {
    return new ItemId(value);
  }
}`);
write('shared/index.ts', `export * from './BomId';\nexport * from './BomComponentId';\nexport * from './ItemId';`);

// 3. Value Objects
write('value-objects/Quantity.ts', `import { ValueObject } from '../../../core/domain/value-objects/ValueObject';
import { Result } from '../../../core/results/Result';

export interface QuantityProps {
  value: number;
}

export class Quantity extends ValueObject<QuantityProps> {
  private constructor(props: QuantityProps) {
    super(props);
  }

  public get value(): number {
    return this.props.value;
  }

  public static create(value: number): Result<Quantity> {
    if (value <= 0) {
      return Result.failure({ code: 'INVALID_QUANTITY', message: 'Quantity must be greater than zero.' });
    }
    return Result.success(new Quantity({ value }));
  }
}`);
write('value-objects/Version.ts', `import { ValueObject } from '../../../core/domain/value-objects/ValueObject';
import { Result } from '../../../core/results/Result';

export interface VersionProps {
  value: number;
}

export class Version extends ValueObject<VersionProps> {
  private constructor(props: VersionProps) {
    super(props);
  }

  public get value(): number {
    return this.props.value;
  }

  public next(): Version {
    return new Version({ value: this.value + 1 });
  }

  public static create(value: number): Result<Version> {
    if (value <= 0) {
      return Result.failure({ code: 'INVALID_VERSION', message: 'Version must be greater than zero.' });
    }
    return Result.success(new Version({ value }));
  }
}`);
write('value-objects/index.ts', `export * from './Quantity';\nexport * from './Version';`);

// 4. Exceptions
write('exceptions/BomDomainException.ts', `import { DomainException } from '../../../core/domain/exceptions/DomainException';

export class BomDomainException extends DomainException {
  constructor(message: string, code: string = 'BOM_DOMAIN_ERROR') {
    super(message, code);
    this.name = 'BomDomainException';
  }
}`);
write('exceptions/index.ts', `export * from './BomDomainException';`);

// 5. Events
write('events/BomCreatedEvent.ts', `import { DomainEvent } from '../../../core/domain/events/DomainEvent';
import { BomId } from '../shared/BomId';

export class BomCreatedEvent extends DomainEvent {
  constructor(
    public readonly targetItemId: string,
    bomId: BomId
  ) {
    super(
      'BOM_CREATED',
      'BomCreatedEvent',
      new Date(),
      bomId.value,
      'BillOfMaterial',
      1
    );
  }
}`);
write('events/BomActivatedEvent.ts', `import { DomainEvent } from '../../../core/domain/events/DomainEvent';
import { BomId } from '../shared/BomId';

export class BomActivatedEvent extends DomainEvent {
  constructor(
    bomId: BomId,
    version: number
  ) {
    super(
      'BOM_ACTIVATED',
      'BomActivatedEvent',
      new Date(),
      bomId.value,
      'BillOfMaterial',
      version
    );
  }
}`);
write('events/index.ts', `export * from './BomCreatedEvent';\nexport * from './BomActivatedEvent';`);

// 6. Entities
write('entities/BomComponent.ts', `import { Entity } from '../../../core/domain/entities/Entity';
import { BomComponentId } from '../shared/BomComponentId';
import { BomId } from '../shared/BomId';
import { ItemId } from '../shared/ItemId';
import { Quantity } from '../value-objects/Quantity';
import { Result } from '../../../core/results/Result';

export class BomComponent extends Entity<BomComponentId> {
  private _bomId: BomId;
  private _itemId: ItemId;
  private _quantity: Quantity;
  private _unitOfMeasure: string;
  private _scrapPercentage: number;

  private constructor(
    id: BomComponentId,
    bomId: BomId,
    itemId: ItemId,
    quantity: Quantity,
    unitOfMeasure: string,
    scrapPercentage: number,
    createdAt: Date,
    version: number
  ) {
    super(id, createdAt, version);
    this._bomId = bomId;
    this._itemId = itemId;
    this._quantity = quantity;
    this._unitOfMeasure = unitOfMeasure;
    this._scrapPercentage = scrapPercentage;
  }

  public get bomId(): BomId { return this._bomId; }
  public get itemId(): ItemId { return this._itemId; }
  public get quantity(): Quantity { return this._quantity; }
  public get unitOfMeasure(): string { return this._unitOfMeasure; }
  public get scrapPercentage(): number { return this._scrapPercentage; }

  public updateQuantity(quantity: Quantity): void {
    this._quantity = quantity;
  }

  public updateScrapPercentage(percentage: number): Result<void> {
    if (percentage < 0 || percentage > 100) {
      return Result.failure({ code: 'INVALID_SCRAP_PERCENTAGE', message: 'Scrap percentage must be between 0 and 100.' });
    }
    this._scrapPercentage = percentage;
    return Result.success();
  }

  public static create(
    id: BomComponentId,
    bomId: BomId,
    itemId: ItemId,
    quantity: Quantity,
    unitOfMeasure: string,
    scrapPercentage: number = 0
  ): Result<BomComponent> {
    if (scrapPercentage < 0 || scrapPercentage > 100) {
      return Result.failure({ code: 'INVALID_SCRAP_PERCENTAGE', message: 'Scrap percentage must be between 0 and 100.' });
    }
    return Result.success(new BomComponent(id, bomId, itemId, quantity, unitOfMeasure, scrapPercentage, new Date(), 1));
  }
}`);
write('entities/BillOfMaterial.ts', `import { AggregateRoot } from '../../../core/domain/entities/AggregateRoot';
import { BomId } from '../shared/BomId';
import { ItemId } from '../shared/ItemId';
import { Version } from '../value-objects/Version';
import { BomStatus } from '../enums/BomStatus';
import { BomComponent } from './BomComponent';
import { BomCreatedEvent } from '../events/BomCreatedEvent';
import { BomActivatedEvent } from '../events/BomActivatedEvent';
import { Result } from '../../../core/results/Result';

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
}`);
write('entities/index.ts', `export * from './BomComponent';\nexport * from './BillOfMaterial';`);

// 7. Repositories
write('repositories/IBomRepository.ts', `import { IRepository } from '../../../core/domain/repositories/IRepository';
import { BillOfMaterial } from '../entities/BillOfMaterial';
import { BomId } from '../shared/BomId';
import { ItemId } from '../shared/ItemId';

export interface IBomRepository extends IRepository<BillOfMaterial, BomId> {
  findByTargetItemId(itemId: ItemId): Promise<BillOfMaterial[]>;
  getActiveBomForTarget(itemId: ItemId): Promise<BillOfMaterial | null>;
}`);
write('repositories/index.ts', `export * from './IBomRepository';`);

// 8. Services
write('services/BomCycleDetectionService.ts', `import { ItemId } from '../shared/ItemId';
import { IBomRepository } from '../repositories/IBomRepository';
import { BillOfMaterial } from '../entities/BillOfMaterial';
import { Result } from '../../../core/results/Result';

export class BomCycleDetectionService {
  constructor(private readonly bomRepository: IBomRepository) {}

  public async detectCycle(bom: BillOfMaterial): Promise<Result<void>> {
    const visited = new Set<string>();
    const recursionStack = new Set<string>();

    const dfs = async (currentItemId: ItemId): Promise<Result<void>> => {
      visited.add(currentItemId.value);
      recursionStack.add(currentItemId.value);

      const activeBom = await this.bomRepository.getActiveBomForTarget(currentItemId);
      if (activeBom) {
        for (const comp of activeBom.components) {
          if (!visited.has(comp.itemId.value)) {
            const result = await dfs(comp.itemId);
            if (result.isFailure) return result;
          } else if (recursionStack.has(comp.itemId.value)) {
            return Result.failure({ code: 'BOM_CYCLE_DETECTED', message: \`Circular dependency detected involving item \${comp.itemId.value}\` });
          }
        }
      }

      recursionStack.delete(currentItemId.value);
      return Result.success();
    };

    // We start DFS from the BOM we are trying to check/save
    // Assume its target item is the root
    visited.add(bom.targetItemId.value);
    recursionStack.add(bom.targetItemId.value);

    for (const comp of bom.components) {
      if (!visited.has(comp.itemId.value)) {
        const result = await dfs(comp.itemId);
        if (result.isFailure) return result;
      } else if (recursionStack.has(comp.itemId.value)) {
        return Result.failure({ code: 'BOM_CYCLE_DETECTED', message: \`Circular dependency detected involving item \${comp.itemId.value}\` });
      }
    }
    
    return Result.success();
  }
}`);
write('services/index.ts', `export * from './BomCycleDetectionService';`);

// 9. Root Index
write('index.ts', `export * from './entities';
export * from './enums';
export * from './events';
export * from './exceptions';
export * from './repositories';
export * from './services';
export * from './shared';
export * from './value-objects';`);
