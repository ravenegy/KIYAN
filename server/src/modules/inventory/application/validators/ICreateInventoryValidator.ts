import { Result } from '../../../../core';
import { CreateInventoryItemCommand } from '../commands/CreateInventoryItemCommand';

export interface ICreateInventoryValidator {
  validate(command: CreateInventoryItemCommand): Result<void>;
}
