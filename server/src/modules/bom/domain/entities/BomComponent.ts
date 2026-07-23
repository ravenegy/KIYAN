import { Entity } from '../../../../core/domain/entities/Entity';
import { BomComponentId } from '../shared/BomComponentId';
import { BomId } from '../shared/BomId';
import { ItemId } from '../shared/ItemId';
import { Quantity } from '../value-objects/Quantity';
import { Result } from '../../../../core/results/Result';

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
}
