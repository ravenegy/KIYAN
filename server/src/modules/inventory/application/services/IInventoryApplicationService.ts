import { Result } from '../../../../core';
import { InventoryItemDto } from '../dto/InventoryItemDto';
import { PagedInventoryDto } from '../dto/PagedInventoryDto';
import { CreateInventoryItemCommand } from '../commands/CreateInventoryItemCommand';
import { UpdateInventoryItemCommand } from '../commands/UpdateInventoryItemCommand';
import { DeleteInventoryItemCommand } from '../commands/DeleteInventoryItemCommand';

export interface IInventoryApplicationService {
  getItemBySku(sku: string): Promise<Result<InventoryItemDto>>;
  createItem(command: CreateInventoryItemCommand): Promise<Result<string>>;
  updateItem(command: UpdateInventoryItemCommand): Promise<Result<void>>;
  deleteItem(command: DeleteInventoryItemCommand): Promise<Result<void>>;
  getItemById(targetId: string): Promise<Result<InventoryItemDto>>;
  getItems(pageNumber: number, pageSize: number): Promise<Result<PagedInventoryDto>>;
}
