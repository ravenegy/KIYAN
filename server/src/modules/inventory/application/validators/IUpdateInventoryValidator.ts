import { Result } from '../../../../core';
import { UpdateInventoryItemCommand } from '../commands/UpdateInventoryItemCommand';

export interface IUpdateInventoryValidator {
  validate(command: UpdateInventoryItemCommand): Result<void>;
}
