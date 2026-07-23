import { Result, ResultFactory } from '../../../../../core';
import { UpdateInventoryItemCommand } from '../../commands/UpdateInventoryItemCommand';
import { IUpdateInventoryValidator } from '../IUpdateInventoryValidator';

export class UpdateInventoryValidator implements IUpdateInventoryValidator {
  validate(command: UpdateInventoryItemCommand): Result<void> {
    if (!command.targetId || !command.targetId.value.trim()) {
      return ResultFactory.validation('Target ID is required');
    }
    if (command.name !== undefined && !command.name.trim()) {
      return ResultFactory.validation('Name cannot be empty if provided');
    }
    return ResultFactory.success();
  }
}
