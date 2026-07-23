import { InventoryItem } from '../entities/InventoryItem';
import { InventoryItemId } from '../shared/InventoryItemId';
import { SKU } from '../value-objects/SKU';
import { ItemCategory } from '../enums/ItemCategory';
import { Result, ErrorCode } from '../../../../core';

export class InventoryItemFactory {
  public static createNewItem(id: string, skuStr: string, category: ItemCategory, name: string): Result<InventoryItem> {
    const idResult = InventoryItemId.create(id);
    if (idResult.isFailure) {
      return Result.failure(idResult.error!);
    }

    const skuResult = SKU.create(skuStr);
    if (skuResult.isFailure) {
      return Result.failure(skuResult.error!);
    }

    if (!name || name.trim() === '') {
      return Result.failure({ code: ErrorCode.Validation, message: 'Name cannot be empty' });
    }

    const item = InventoryItem.create(idResult.value as InventoryItemId, skuResult.value as SKU, category, name);
    return Result.success(item);
  }
}
