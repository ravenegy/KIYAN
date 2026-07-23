const fs = require('fs');
const path = require('path');

const modDir = path.join(__dirname, 'server/src/modules/inventory/domain');

function write(subpath, content) {
    const dir = path.dirname(path.join(modDir, subpath));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(modDir, subpath), content.trim() + '\n');
}

write('shared/StronglyTypedIds.ts', `
export type InventoryItemId = string & { readonly __brand: 'InventoryItemId' };
export type StockLocationId = string & { readonly __brand: 'StockLocationId' };
export type LotId = string & { readonly __brand: 'LotId' };
export type StockMovementId = string & { readonly __brand: 'StockMovementId' };
`);

write('shared/index.ts', `
export * from './StronglyTypedIds';
`);

write('enums/ItemCategory.ts', `
export enum ItemCategory {
  RawMaterial = 'RAW_MATERIAL',
  WorkInProgress = 'WIP',
  FinishedGood = 'FINISHED_GOOD',
  Packaging = 'PACKAGING',
  Consumable = 'CONSUMABLE'
}
`);

write('enums/MovementType.ts', `
export enum MovementType {
  Receipt = 'RECEIPT',
  Issue = 'ISSUE',
  Transfer = 'TRANSFER',
  Adjustment = 'ADJUSTMENT'
}
`);

write('enums/index.ts', `
export * from './ItemCategory';
export * from './MovementType';
`);

write('exceptions/InventoryDomainException.ts', `
export class InventoryDomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InventoryDomainException';
  }
}
`);

write('exceptions/index.ts', `
export * from './InventoryDomainException';
`);

write('value-objects/Quantity.ts', `
import { InventoryDomainException } from '../exceptions';

export class Quantity {
  public readonly value: number;

  private constructor(value: number) {
    this.value = value;
    Object.freeze(this);
  }

  public static create(value: number): Quantity {
    if (value < 0) {
      throw new InventoryDomainException('Quantity cannot be negative.');
    }
    return new Quantity(value);
  }

  public add(other: Quantity): Quantity {
    return Quantity.create(this.value + other.value);
  }

  public subtract(other: Quantity): Quantity {
    if (this.value < other.value) {
      throw new InventoryDomainException('Insufficient quantity.');
    }
    return Quantity.create(this.value - other.value);
  }

  public equals(other: Quantity): boolean {
    return this.value === other.value;
  }
}
`);

write('value-objects/SKU.ts', `
import { InventoryDomainException } from '../exceptions';

export class SKU {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
    Object.freeze(this);
  }

  public static create(value: string): SKU {
    if (!value || value.trim().length === 0) {
      throw new InventoryDomainException('SKU cannot be empty.');
    }
    // Assume standard SKU validation
    if (!/^[A-Z0-9-]+$/.test(value)) {
      throw new InventoryDomainException('SKU contains invalid characters.');
    }
    return new SKU(value);
  }

  public equals(other: SKU): boolean {
    return this.value === other.value;
  }
}
`);

write('value-objects/index.ts', `
export * from './Quantity';
export * from './SKU';
`);

write('events/StockAdjustedEvent.ts', `
import { InventoryItemId, StockLocationId } from '../shared/StronglyTypedIds';

export class StockAdjustedEvent {
  constructor(
    public readonly itemId: InventoryItemId,
    public readonly locationId: StockLocationId,
    public readonly oldQuantity: number,
    public readonly newQuantity: number,
    public readonly reason: string,
    public readonly adjustedAt: Date
  ) {
    Object.freeze(this);
  }
}
`);

write('events/InventoryItemCreatedEvent.ts', `
import { InventoryItemId } from '../shared/StronglyTypedIds';
import { ItemCategory } from '../enums/ItemCategory';

export class InventoryItemCreatedEvent {
  constructor(
    public readonly itemId: InventoryItemId,
    public readonly sku: string,
    public readonly category: ItemCategory,
    public readonly createdAt: Date
  ) {
    Object.freeze(this);
  }
}
`);

write('events/index.ts', `
export * from './StockAdjustedEvent';
export * from './InventoryItemCreatedEvent';
`);

write('entities/StockLevel.ts', `
import { StockLocationId, LotId } from '../shared/StronglyTypedIds';
import { Quantity } from '../value-objects/Quantity';
import { InventoryDomainException } from '../exceptions';

export class StockLevel {
  public readonly locationId: StockLocationId;
  public readonly lotId: LotId | null;
  private _quantity: Quantity;

  constructor(locationId: StockLocationId, quantity: Quantity, lotId: LotId | null = null) {
    this.locationId = locationId;
    this._quantity = quantity;
    this.lotId = lotId;
  }

  public get quantity(): Quantity {
    return this._quantity;
  }

  public addQuantity(amount: Quantity): void {
    this._quantity = this._quantity.add(amount);
  }

  public removeQuantity(amount: Quantity): void {
    if (this._quantity.value < amount.value) {
      throw new InventoryDomainException('Cannot remove more stock than available at location.');
    }
    this._quantity = this._quantity.subtract(amount);
  }
}
`);

write('entities/InventoryItem.ts', `
import { InventoryItemId } from '../shared/StronglyTypedIds';
import { SKU } from '../value-objects/SKU';
import { ItemCategory } from '../enums/ItemCategory';
import { StockLevel } from './StockLevel';
import { Quantity } from '../value-objects/Quantity';
import { StockLocationId } from '../shared/StronglyTypedIds';
import { InventoryDomainException } from '../exceptions';
import { StockAdjustedEvent } from '../events/StockAdjustedEvent';
import { InventoryItemCreatedEvent } from '../events/InventoryItemCreatedEvent';

export class InventoryItem {
  private readonly _domainEvents: any[] = [];
  private readonly _stockLevels: Map<StockLocationId, StockLevel> = new Map();

  public constructor(
    public readonly id: InventoryItemId,
    public readonly sku: SKU,
    public readonly category: ItemCategory,
    public readonly name: string,
    public isActive: boolean = true
  ) {}

  public get domainEvents(): ReadonlyArray<any> {
    return this._domainEvents;
  }

  public clearDomainEvents(): void {
    this._domainEvents.length = 0;
  }

  protected addDomainEvent(event: any): void {
    this._domainEvents.push(event);
  }

  public static create(id: InventoryItemId, sku: SKU, category: ItemCategory, name: string): InventoryItem {
    const item = new InventoryItem(id, sku, category, name);
    item.addDomainEvent(new InventoryItemCreatedEvent(id, sku.value, category, new Date()));
    return item;
  }

  public getStockAt(locationId: StockLocationId): Quantity {
    const level = this._stockLevels.get(locationId);
    return level ? level.quantity : Quantity.create(0);
  }

  public getTotalStock(): Quantity {
    let total = 0;
    for (const level of this._stockLevels.values()) {
      total += level.quantity.value;
    }
    return Quantity.create(total);
  }

  public adjustStock(locationId: StockLocationId, newQuantity: Quantity, reason: string): void {
    if (!this.isActive) {
      throw new InventoryDomainException('Cannot adjust stock for inactive item.');
    }

    const currentLevel = this._stockLevels.get(locationId);
    const oldQuantity = currentLevel ? currentLevel.quantity : Quantity.create(0);

    if (currentLevel) {
      if (newQuantity.value > currentLevel.quantity.value) {
        currentLevel.addQuantity(Quantity.create(newQuantity.value - currentLevel.quantity.value));
      } else {
        currentLevel.removeQuantity(Quantity.create(currentLevel.quantity.value - newQuantity.value));
      }
    } else {
      this._stockLevels.set(locationId, new StockLevel(locationId, newQuantity));
    }

    this.addDomainEvent(new StockAdjustedEvent(this.id, locationId, oldQuantity.value, newQuantity.value, reason, new Date()));
  }
}
`);

write('entities/index.ts', `
export * from './StockLevel';
export * from './InventoryItem';
`);

write('factories/InventoryItemFactory.ts', `
import { InventoryItem } from '../entities/InventoryItem';
import { InventoryItemId } from '../shared/StronglyTypedIds';
import { SKU } from '../value-objects/SKU';
import { ItemCategory } from '../enums/ItemCategory';

export class InventoryItemFactory {
  public static createNewItem(id: string, skuStr: string, category: ItemCategory, name: string): InventoryItem {
    const itemId = id as InventoryItemId;
    const sku = SKU.create(skuStr);
    return InventoryItem.create(itemId, sku, category, name);
  }
}
`);

write('factories/index.ts', `
export * from './InventoryItemFactory';
`);

write('repositories/IInventoryItemRepository.ts', `
import { InventoryItem } from '../entities/InventoryItem';
import { InventoryItemId } from '../shared/StronglyTypedIds';
import { SKU } from '../value-objects/SKU';

export interface IInventoryItemRepository {
  findById(id: InventoryItemId): Promise<InventoryItem | null>;
  findBySku(sku: SKU): Promise<InventoryItem | null>;
  save(item: InventoryItem): Promise<void>;
  delete(id: InventoryItemId): Promise<void>;
}
`);

write('repositories/index.ts', `
export * from './IInventoryItemRepository';
`);

write('services/StockMovementDomainService.ts', `
import { InventoryItem } from '../entities/InventoryItem';
import { StockLocationId } from '../shared/StronglyTypedIds';
import { Quantity } from '../value-objects/Quantity';
import { InventoryDomainException } from '../exceptions';

export class StockMovementDomainService {
  public transferStock(
    item: InventoryItem,
    fromLocation: StockLocationId,
    toLocation: StockLocationId,
    amount: Quantity
  ): void {
    if (fromLocation === toLocation) {
      throw new InventoryDomainException('Cannot transfer stock to the same location.');
    }

    const currentFromStock = item.getStockAt(fromLocation);
    if (currentFromStock.value < amount.value) {
      throw new InventoryDomainException('Insufficient stock at source location for transfer.');
    }

    item.adjustStock(fromLocation, currentFromStock.subtract(amount), 'Transfer Out');
    
    const currentToStock = item.getStockAt(toLocation);
    item.adjustStock(toLocation, currentToStock.add(amount), 'Transfer In');
  }
}
`);

write('services/index.ts', `
export * from './StockMovementDomainService';
`);

write('specifications/HasSufficientStockSpecification.ts', `
import { InventoryItem } from '../entities/InventoryItem';
import { StockLocationId } from '../shared/StronglyTypedIds';
import { Quantity } from '../value-objects/Quantity';

export interface ISpecification<T> {
  isSatisfiedBy(candidate: T): boolean;
}

export class HasSufficientStockSpecification implements ISpecification<InventoryItem> {
  constructor(
    private readonly locationId: StockLocationId,
    private readonly requiredQuantity: Quantity
  ) {}

  public isSatisfiedBy(item: InventoryItem): boolean {
    const stock = item.getStockAt(this.locationId);
    return stock.value >= this.requiredQuantity.value;
  }
}
`);

write('specifications/index.ts', `
export * from './HasSufficientStockSpecification';
`);

write('policies/StockAllocationPolicy.ts', `
import { InventoryItem } from '../entities/InventoryItem';
import { StockLocationId } from '../shared/StronglyTypedIds';
import { Quantity } from '../value-objects/Quantity';
import { ItemCategory } from '../enums/ItemCategory';

export class StockAllocationPolicy {
  public static canAllocate(item: InventoryItem, locationId: StockLocationId, amount: Quantity): boolean {
    if (!item.isActive) return false;
    
    // Example rule: Raw materials might have stricter allocation rules or safety stock limits
    if (item.category === ItemCategory.RawMaterial) {
      // Just an example logic
      const total = item.getTotalStock();
      // Ensure at least 10 units remain globally for raw materials
      if (total.value - amount.value < 10) {
        return false;
      }
    }

    const stockAtLocation = item.getStockAt(locationId);
    return stockAtLocation.value >= amount.value;
  }
}
`);

write('policies/index.ts', `
export * from './StockAllocationPolicy';
`);

write('index.ts', `
export * from './shared';
export * from './enums';
export * from './exceptions';
export * from './value-objects';
export * from './events';
export * from './entities';
export * from './factories';
export * from './repositories';
export * from './services';
export * from './specifications';
export * from './policies';
`);

