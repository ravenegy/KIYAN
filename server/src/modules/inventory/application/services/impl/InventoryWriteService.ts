import { IInventoryWriteService } from '../IInventoryWriteService';
import { Result } from '../../../../../core';
import { CreateInventoryItemCommand } from '../../commands/CreateInventoryItemCommand';
import { UpdateInventoryItemCommand } from '../../commands/UpdateInventoryItemCommand';
import { DeleteInventoryItemCommand } from '../../commands/DeleteInventoryItemCommand';
import { IMediator } from '../../../../../core/mediator/IMediator';

export class InventoryWriteService implements IInventoryWriteService {
  constructor(private readonly mediator: IMediator) {}

  async createItem(command: CreateInventoryItemCommand): Promise<Result<string>> {
    return this.mediator.send(command);
  }

  async updateItem(command: UpdateInventoryItemCommand): Promise<Result<void>> {
    return this.mediator.send(command);
  }

  async deleteItem(command: DeleteInventoryItemCommand): Promise<Result<void>> {
    return this.mediator.send(command);
  }
}
