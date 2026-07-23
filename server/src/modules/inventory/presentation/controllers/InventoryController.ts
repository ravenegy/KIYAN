import { IInventoryApplicationService } from '../../application/services/IInventoryApplicationService';
import { CreateInventoryItemCommand } from '../../application/commands/CreateInventoryItemCommand';
import { UpdateInventoryItemCommand } from '../../application/commands/UpdateInventoryItemCommand';
import { DeleteInventoryItemCommand } from '../../application/commands/DeleteInventoryItemCommand';
import { ApiResponse, ApiResponseBuilder } from '../models/responses/ApiResponse';
import { InventoryItemResponse } from '../models/responses/InventoryItemResponse';
import { PagedResponse } from '../models/responses/PagedResponse';
import { CreateInventoryItemRequest } from '../models/requests/CreateInventoryItemRequest';
import { UpdateInventoryItemRequest } from '../models/requests/UpdateInventoryItemRequest';
import { SKU } from '../../domain/value-objects/SKU';
import { ItemCategory } from '../../domain/enums/ItemCategory';
import { InventoryItemId } from '../../domain/shared/InventoryItemId';

export class InventoryController {
  constructor(private readonly inventoryService: IInventoryApplicationService) {}

  public async getItems(page: number, pageSize: number): Promise<ApiResponse<PagedResponse<InventoryItemResponse>>> {
    const result = await this.inventoryService.getItems(page, pageSize);
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    
    const pagedData = result.value!;
    return ApiResponseBuilder.success({
      items: pagedData.items.map(dto => ({
        id: dto.id,
        sku: dto.sku,
        name: dto.name,
        description: "",
        categoryId: dto.category,
        status: dto.isActive ? 'Active' : 'Inactive',
        trackingType: "",
        hasExpirations: false,
        isBatchTracked: false,
        isSerialTracked: false,
        createdAt: dto.createdAt,
        updatedAt: dto.updatedAt || "",
      })),
      total: pagedData.totalCount,
      page: pagedData.pageNumber,
      pageSize: pagedData.pageSize,
      totalPages: Math.ceil(pagedData.totalCount / pagedData.pageSize),
    });
  }

  public async getItemById(id: string): Promise<ApiResponse<InventoryItemResponse>> {
    const result = await this.inventoryService.getItemById(id);
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    
    const dto = result.value!;
    return ApiResponseBuilder.success({
      id: dto.id,
      sku: dto.sku,
      name: dto.name,
      description: "",
      categoryId: dto.category,
      status: dto.isActive ? 'Active' : 'Inactive',
      trackingType: "",
      hasExpirations: false,
      isBatchTracked: false,
      isSerialTracked: false,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt || "",
    });
  }

  public async getItemBySku(sku: string): Promise<ApiResponse<InventoryItemResponse>> {
    const result = await this.inventoryService.getItemBySku(sku);
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    
    const dto = result.value!;
    return ApiResponseBuilder.success({
      id: dto.id,
      sku: dto.sku,
      name: dto.name,
      description: "",
      categoryId: dto.category,
      status: dto.isActive ? 'Active' : 'Inactive',
      trackingType: "",
      hasExpirations: false,
      isBatchTracked: false,
      isSerialTracked: false,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt || "",
    });
  }

  public async createItem(request: CreateInventoryItemRequest): Promise<ApiResponse<string>> {
    const skuResult = SKU.create(request.sku);
    if (skuResult.isFailure) {
      return ApiResponseBuilder.error(skuResult.error!.message, skuResult.errors?.map(e => e.message));
    }

    const command = new CreateInventoryItemCommand(
      skuResult.value!,
      request.categoryId as ItemCategory,
      request.name
    );
    
    const result = await this.inventoryService.createItem(command);
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    
    return ApiResponseBuilder.success(result.value!);
  }

  public async updateItem(id: string, request: UpdateInventoryItemRequest): Promise<ApiResponse<void>> {
    const idResult = InventoryItemId.create(id);
    if (idResult.isFailure) {
      return ApiResponseBuilder.error(idResult.error!.message, idResult.errors?.map(e => e.message));
    }

    const command = new UpdateInventoryItemCommand(
      idResult.value!,
      request.name,
      true
    );
    
    const result = await this.inventoryService.updateItem(command);
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    
    return ApiResponseBuilder.success(undefined as void);
  }

  public async deleteItem(id: string): Promise<ApiResponse<void>> {
    const idResult = InventoryItemId.create(id);
    if (idResult.isFailure) {
      return ApiResponseBuilder.error(idResult.error!.message, idResult.errors?.map(e => e.message));
    }

    const command = new DeleteInventoryItemCommand(idResult.value!);
    
    const result = await this.inventoryService.deleteItem(command);
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    
    return ApiResponseBuilder.success(undefined as void);
  }
}
