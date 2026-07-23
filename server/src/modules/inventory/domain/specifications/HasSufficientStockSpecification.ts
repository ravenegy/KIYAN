import { InventoryItem } from '../entities/InventoryItem';
import { StockLocationId } from '../shared/StockLocationId';
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
