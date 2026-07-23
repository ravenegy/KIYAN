import { Result } from '../../../../core';
import { CreateInventoryItemCommand } from '../commands/CreateInventoryItemCommand';
import { UpdateInventoryItemCommand } from '../commands/UpdateInventoryItemCommand';
import { DeleteInventoryItemCommand } from '../commands/DeleteInventoryItemCommand';

export interface IInventoryWriteService {
  createItem(command: CreateInventoryItemCommand): Promise<Result<string>>;
  updateItem(command: UpdateInventoryItemCommand): Promise<Result<void>>;
  deleteItem(command: DeleteInventoryItemCommand): Promise<Result<void>>;
}
