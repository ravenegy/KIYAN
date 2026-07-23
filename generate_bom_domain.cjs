const fs = require('fs');
const path = require('path');

const modDir = path.join(__dirname, 'server/src/modules/bom/domain');
function write(subpath, content) {
    const dir = path.dirname(path.join(modDir, subpath));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(modDir, subpath), content.trim() + '\n');
}

// Write shared types
write('shared/BomId.ts', `export type BomId = string & { readonly __brand: 'BomId' };`);
write('shared/BomComponentId.ts', `export type BomComponentId = string & { readonly __brand: 'BomComponentId' };`);
write('shared/ItemId.ts', `export type ItemId = string & { readonly __brand: 'ItemId' };`);
write('shared/index.ts', `export * from './BomId';\nexport * from './BomComponentId';\nexport * from './ItemId';`);

// Write Enums
write('enums/BomStatus.ts', `export enum BomStatus {\n  Draft = 'DRAFT',\n  Active = 'ACTIVE',\n  Archived = 'ARCHIVED'\n}`);
write('enums/index.ts', `export * from './BomStatus';`);

// Write Value Objects
write('value-objects/Quantity.ts', `export class Quantity {
  constructor(public readonly value: number) {
    if (value <= 0) {
      throw new Error('Quantity must be greater than zero');
    }
  }
}`);
write('value-objects/Version.ts', `export class Version {
  constructor(public readonly value: number) {
    if (value <= 0) {
      throw new Error('Version must be greater than zero');
    }
  }
  public next(): Version {
    return new Version(this.value + 1);
  }
}`);
write('value-objects/index.ts', `export * from './Quantity';\nexport * from './Version';`);

// Write Exceptions
write('exceptions/BomDomainException.ts', `export class BomDomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BomDomainException';
  }
}`);
write('exceptions/index.ts', `export * from './BomDomainException';`);

// Write Events
write('events/BomCreatedEvent.ts', `import { BomId } from '../shared/BomId';
import { ItemId } from '../shared/ItemId';

export class BomCreatedEvent {
  constructor(
    public readonly bomId: BomId,
    public readonly targetItemId: ItemId,
    public readonly timestamp: Date = new Date()
  ) {}
}`);
write('events/BomActivatedEvent.ts', `import { BomId } from '../shared/BomId';

export class BomActivatedEvent {
  constructor(
    public readonly bomId: BomId,
    public readonly timestamp: Date = new Date()
  ) {}
}`);
write('events/index.ts', `export * from './BomCreatedEvent';\nexport * from './BomActivatedEvent';`);

// Write Entities
write('entities/BomComponent.ts', `import { BomComponentId } from '../shared/BomComponentId';
import { BomId } from '../shared/BomId';
import { ItemId } from '../shared/ItemId';
import { Quantity } from '../value-objects/Quantity';

export class BomComponent {
  constructor(
    public readonly id: BomComponentId,
    public readonly bomId: BomId,
    public readonly itemId: ItemId,
    public quantity: Quantity,
    public readonly unitOfMeasure: string,
    public scrapPercentage: number = 0
  ) {}

  public updateQuantity(quantity: Quantity): void {
    this.quantity = quantity;
  }
}`);
write('entities/BillOfMaterial.ts', `import { BomId } from '../shared/BomId';
import { ItemId } from '../shared/ItemId';
import { Version } from '../value-objects/Version';
import { BomStatus } from '../enums/BomStatus';
import { BomComponent } from './BomComponent';
import { BomDomainException } from '../exceptions/BomDomainException';

export class BillOfMaterial {
  private _components: Map<ItemId, BomComponent> = new Map();

  constructor(
    public readonly id: BomId,
    public name: string,
    public readonly targetItemId: ItemId,
    public status: BomStatus,
    public version: Version,
    components: BomComponent[] = []
  ) {
    for (const comp of components) {
      this._components.set(comp.itemId, comp);
    }
  }

  public get components(): ReadonlyArray<BomComponent> {
    return Array.from(this._components.values());
  }

  public addComponent(component: BomComponent): void {
    if (this.status !== BomStatus.Draft) {
      throw new BomDomainException('Can only add components to a Draft BOM');
    }
    if (this.targetItemId === component.itemId) {
      throw new BomDomainException('BOM target item cannot be its own component');
    }
    this._components.set(component.itemId, component);
  }

  public removeComponent(itemId: ItemId): void {
    if (this.status !== BomStatus.Draft) {
      throw new BomDomainException('Can only remove components from a Draft BOM');
    }
    this._components.delete(itemId);
  }

  public activate(): void {
    if (this._components.size === 0) {
      throw new BomDomainException('Cannot activate a BOM with no components');
    }
    this.status = BomStatus.Active;
  }

  public archive(): void {
    this.status = BomStatus.Archived;
  }
}`);
write('entities/index.ts', `export * from './BomComponent';\nexport * from './BillOfMaterial';`);

// Write Repository Interfaces
write('repositories/IBomRepository.ts', `import { BillOfMaterial } from '../entities/BillOfMaterial';
import { BomId } from '../shared/BomId';
import { ItemId } from '../shared/ItemId';

export interface IBomRepository {
  findById(id: BomId): Promise<BillOfMaterial | null>;
  findByTargetItemId(itemId: ItemId): Promise<BillOfMaterial[]>;
  getActiveBomForTarget(itemId: ItemId): Promise<BillOfMaterial | null>;
  save(bom: BillOfMaterial): Promise<void>;
}`);
write('repositories/index.ts', `export * from './IBomRepository';`);

// Write Domain Services
write('services/BomCycleDetectionService.ts', `import { ItemId } from '../shared/ItemId';
import { IBomRepository } from '../repositories/IBomRepository';
import { BomDomainException } from '../exceptions/BomDomainException';
import { BillOfMaterial } from '../entities/BillOfMaterial';

export class BomCycleDetectionService {
  constructor(private readonly bomRepository: IBomRepository) {}

  public async detectCycle(bom: BillOfMaterial): Promise<void> {
    const visited = new Set<string>();
    const recursionStack = new Set<string>();

    const dfs = async (currentItemId: ItemId): Promise<void> => {
      visited.add(currentItemId as string);
      recursionStack.add(currentItemId as string);

      const activeBom = await this.bomRepository.getActiveBomForTarget(currentItemId);
      if (activeBom) {
        for (const comp of activeBom.components) {
          if (!visited.has(comp.itemId as string)) {
            await dfs(comp.itemId);
          } else if (recursionStack.has(comp.itemId as string)) {
            throw new BomDomainException(\`Circular dependency detected involving item \${comp.itemId}\`);
          }
        }
      }

      recursionStack.delete(currentItemId as string);
    };

    // We start DFS from the BOM we are trying to check/save
    // Assume its target item is the root
    visited.add(bom.targetItemId as string);
    recursionStack.add(bom.targetItemId as string);

    for (const comp of bom.components) {
      if (!visited.has(comp.itemId as string)) {
        await dfs(comp.itemId);
      } else if (recursionStack.has(comp.itemId as string)) {
        throw new BomDomainException(\`Circular dependency detected involving item \${comp.itemId}\`);
      }
    }
  }
}`);
write('services/index.ts', `export * from './BomCycleDetectionService';`);

write('index.ts', `export * from './entities';
export * from './enums';
export * from './events';
export * from './exceptions';
export * from './repositories';
export * from './services';
export * from './shared';
export * from './value-objects';`);

console.log('BOM Domain created.');
