import { Result, ResultFactory } from '../../../../../core';
import { AdjustStockCommand } from '../../commands/AdjustStockCommand';
import { IAdjustStockValidator } from '../IAdjustStockValidator';

export class AdjustStockValidator implements IAdjustStockValidator {
  validate(command: AdjustStockCommand): Result<void> {
    if (!command.inventoryItemId || !command.inventoryItemId.value.trim()) {
      return ResultFactory.validation('Inventory Item ID is required');
    }
    if (!command.locationId || !command.locationId.value.trim()) {
      return ResultFactory.validation('Location ID is required');
    }
    if (!command.newQuantity || command.newQuantity.value < 0) {
      return ResultFactory.validation('Quantity cannot be negative');
    }
    if (!command.reason || !command.reason.trim()) {
      return ResultFactory.validation('Reason is required');
    }
    return ResultFactory.success();
  }
}
