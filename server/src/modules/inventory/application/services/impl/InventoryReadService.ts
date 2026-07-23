import { IInventoryReadService } from '../IInventoryReadService';
import { Result, ResultFactory } from '../../../../../core';
import { InventoryItemDto } from '../../dto/InventoryItemDto';
import { PagedInventoryDto } from '../../dto/PagedInventoryDto';
import { GetInventoryItemByIdQuery } from '../../queries/GetInventoryItemByIdQuery';
import { GetInventoryItemsQuery } from '../../queries/GetInventoryItemsQuery';
import { SearchInventoryItemsQuery } from '../../queries/SearchInventoryItemsQuery';
import { IMediator } from '../../../../../core/mediator/IMediator';
import { InventoryItemId } from '../../../domain/shared/InventoryItemId';

export class InventoryReadService implements IInventoryReadService {
  constructor(private readonly mediator: IMediator) {}

  async getItemBySku(sku: string): Promise<Result<InventoryItemDto>> {
    const { GetInventoryBySkuQuery } = await import("../../queries/GetInventoryBySkuQuery");
    const { SKU } = await import("../../../domain/value-objects/SKU");
    const { ResultFactory } = await import("../../../../../core");
    const skuResult = SKU.create(sku);
    if (skuResult.isFailure) return ResultFactory.failure(skuResult.error!, skuResult.errors ? [...skuResult.errors] : undefined);
    return this.mediator.query(new GetInventoryBySkuQuery(skuResult.value!));
  }

  async getItemById(targetId: string): Promise<Result<InventoryItemDto>> {
    const idResult = InventoryItemId.create(targetId);
    if (idResult.isFailure) return ResultFactory.failure(idResult.error!, idResult.errors ? [...idResult.errors] : undefined);
    return this.mediator.query(new GetInventoryItemByIdQuery(idResult.value!));
  }

  async getItems(pageNumber: number, pageSize: number): Promise<Result<PagedInventoryDto>> {
    return this.mediator.query(new GetInventoryItemsQuery(pageNumber, pageSize));
  }

  async searchItems(searchTerm: string, category: string | undefined, pageNumber: number, pageSize: number): Promise<Result<PagedInventoryDto>> {
    return this.mediator.query(new SearchInventoryItemsQuery(searchTerm, category, pageNumber, pageSize));
  }
}
