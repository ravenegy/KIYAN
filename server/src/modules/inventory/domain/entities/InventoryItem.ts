import { AggregateRoot } from '../../../../core/domain/entities/AggregateRoot';
import { InventoryItemId } from '../shared/InventoryItemId';
import { SKU } from '../value-objects/SKU';
import { ItemCategory } from '../enums/ItemCategory';
import { StockLevel } from './StockLevel';
import { Quantity } from '../value-objects/Quantity';
import { StockLocationId } from '../shared/StockLocationId';
import { StockLevelId } from '../shared/StockLevelId';
import { InventoryDomainException } from '../exceptions/InventoryDomainException';
import { StockAdjustedEvent } from '../events/StockAdjustedEvent';
import { InventoryItemCreatedEvent } from '../events/InventoryItemCreatedEvent';
import * as crypto from 'crypto';

export class InventoryItem extends AggregateRoot<InventoryItemId> {
  public readonly sku: SKU;
  public readonly category: ItemCategory;
  public readonly name: string;
  public isActive: boolean;
  
  private readonly _stockLevels: Map<string, StockLevel> = new Map();

  public constructor(
    id: InventoryItemId,
    sku: SKU,
    category: ItemCategory,
    name: string,
    isActive: boolean = true,
    createdAt: Date = new Date(),
    version: number = 1
  ) {
    super(id, createdAt, version);
    this.sku = sku;
    this.category = category;
    this.name = name;
    this.isActive = isActive;
  }

  public get stockLevels(): ReadonlyArray<StockLevel> {
    return Array.from(this._stockLevels.values());
  }

  public static create(id: InventoryItemId, sku: SKU, category: ItemCategory, name: string): InventoryItem {
    const item = new InventoryItem(id, sku, category, name);
    item.addDomainEvent(new InventoryItemCreatedEvent(crypto.randomUUID(), id, sku.value, category, new Date()));
    return item;
  }

  public getStockAt(locationId: StockLocationId): Quantity {
    const level = this._stockLevels.get(locationId.value);
    return level ? level.quantity : Quantity.create(0).value!;
  }

  public getTotalStock(): Quantity {
    let total = 0;
    for (const level of this._stockLevels.values()) {
      total += level.quantity.value;
    }
    return Quantity.create(total).value!;
  }

  public adjustStock(locationId: StockLocationId, newQuantity: Quantity, reason: string): void {
    if (!this.isActive) {
      throw new InventoryDomainException('Cannot adjust stock for inactive item.');
    }

    const currentLevel = this._stockLevels.get(locationId.value);
    const oldQuantity = currentLevel ? currentLevel.quantity : Quantity.create(0).value!;

    if (currentLevel) {
      if (newQuantity.value > currentLevel.quantity.value) {
        currentLevel.addQuantity(Quantity.create(newQuantity.value - currentLevel.quantity.value).value!);
      } else {
        currentLevel.removeQuantity(Quantity.create(currentLevel.quantity.value - newQuantity.value).value!);
      }
    } else {
      const newStockLevelId = StockLevelId.create(crypto.randomUUID()).value!;
      this._stockLevels.set(locationId.value, new StockLevel(newStockLevelId, locationId, newQuantity));
    }

    this.addDomainEvent(new StockAdjustedEvent(crypto.randomUUID(), this.id, locationId, oldQuantity.value, newQuantity.value, reason, new Date()));
  }
}
