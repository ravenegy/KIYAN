import { Result } from '../../../../core';
import { InventoryItemDto } from '../dto/InventoryItemDto';
import { PagedInventoryDto } from '../dto/PagedInventoryDto';

export interface IInventoryReadService {
  getItemBySku(sku: string): Promise<Result<InventoryItemDto>>;
  getItemById(targetId: string): Promise<Result<InventoryItemDto>>;
  getItems(pageNumber: number, pageSize: number): Promise<Result<PagedInventoryDto>>;
  searchItems(searchTerm: string, category: string | undefined, pageNumber: number, pageSize: number): Promise<Result<PagedInventoryDto>>;
}
