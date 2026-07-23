import { Result, ResultFactory } from '../../../../../core';
import { TransferStockCommand } from '../../commands/TransferStockCommand';
import { ITransferStockValidator } from '../ITransferStockValidator';

export class TransferStockValidator implements ITransferStockValidator {
  validate(command: TransferStockCommand): Result<void> {
    if (!command.inventoryItemId || !command.inventoryItemId.value.trim()) {
      return ResultFactory.validation('Inventory Item ID is required');
    }
    if (!command.fromLocationId || !command.fromLocationId.value.trim()) {
      return ResultFactory.validation('Source Location ID is required');
    }
    if (!command.toLocationId || !command.toLocationId.value.trim()) {
      return ResultFactory.validation('Destination Location ID is required');
    }
    if (command.fromLocationId.value === command.toLocationId.value) {
      return ResultFactory.validation('Source and Destination locations must be different');
    }
    if (!command.quantity || command.quantity.value <= 0) {
      return ResultFactory.validation('Quantity must be greater than zero');
    }
    return ResultFactory.success();
  }
}
