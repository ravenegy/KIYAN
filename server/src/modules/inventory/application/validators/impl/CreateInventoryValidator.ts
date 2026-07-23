import { Result, ResultFactory } from '../../../../../core';
import { CreateInventoryItemCommand } from '../../commands/CreateInventoryItemCommand';
import { ICreateInventoryValidator } from '../ICreateInventoryValidator';

export class CreateInventoryValidator implements ICreateInventoryValidator {
  validate(command: CreateInventoryItemCommand): Result<void> {
    if (!command.sku || !command.sku.value.trim()) {
      return ResultFactory.validation('SKU is required');
    }
    if (!command.name || !command.name.trim()) {
      return ResultFactory.validation('Name is required');
    }
    if (!command.category) {
      return ResultFactory.validation('Category is required');
    }
    return ResultFactory.success();
  }
}
