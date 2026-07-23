import { InventoryItemDto } from './InventoryItemDto';

export interface PagedInventoryDto {
  readonly items: ReadonlyArray<InventoryItemDto>;
  readonly totalCount: number;
  readonly pageNumber: number;
  readonly pageSize: number;
}
