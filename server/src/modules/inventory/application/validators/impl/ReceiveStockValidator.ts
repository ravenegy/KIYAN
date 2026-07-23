import { Result, ResultFactory } from '../../../../../core';
import { ReceiveStockCommand } from '../../commands/ReceiveStockCommand';
import { IReceiveStockValidator } from '../IReceiveStockValidator';

export class ReceiveStockValidator implements IReceiveStockValidator {
  validate(command: ReceiveStockCommand): Result<void> {
    if (!command.inventoryItemId || !command.inventoryItemId.value.trim()) {
      return ResultFactory.validation('Inventory Item ID is required');
    }
    if (!command.locationId || !command.locationId.value.trim()) {
      return ResultFactory.validation('Location ID is required');
    }
    if (!command.quantity || command.quantity.value <= 0) {
      return ResultFactory.validation('Quantity must be greater than zero');
    }
    return ResultFactory.success();
  }
}
