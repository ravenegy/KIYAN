import { Entity } from '../../../../core/domain/entities/Entity';
import { StockLevelId } from '../shared/StockLevelId';
import { StockLocationId } from '../shared/StockLocationId';
import { LotId } from '../shared/LotId';
import { Quantity } from '../value-objects/Quantity';
import { InventoryDomainException } from '../exceptions/InventoryDomainException';

export class StockLevel extends Entity<StockLevelId> {
  public readonly locationId: StockLocationId;
  public readonly lotId: LotId | undefined;
  private _quantity: Quantity;

  constructor(
    id: StockLevelId,
    locationId: StockLocationId,
    quantity: Quantity,
    lotId?: LotId,
    createdAt: Date = new Date(),
    version: number = 1
  ) {
    super(id, createdAt, version);
    this.locationId = locationId;
    this._quantity = quantity;
    this.lotId = lotId;
  }

  public get quantity(): Quantity {
    return this._quantity;
  }

  public addQuantity(amount: Quantity): void {
    const newQuantityResult = this._quantity.add(amount);
    if (newQuantityResult.isFailure) {
      throw new InventoryDomainException(newQuantityResult.error?.message || 'Failed to add quantity');
    }
    this._quantity = newQuantityResult.value as Quantity;
  }

  public removeQuantity(amount: Quantity): void {
    const newQuantityResult = this._quantity.subtract(amount);
    if (newQuantityResult.isFailure) {
      throw new InventoryDomainException(newQuantityResult.error?.message || 'Failed to remove quantity');
    }
    this._quantity = newQuantityResult.value as Quantity;
  }
}
