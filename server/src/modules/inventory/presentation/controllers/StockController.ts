import { IStockApplicationService } from '../../application/services/IStockApplicationService';
import { AdjustStockCommand } from '../../application/commands/AdjustStockCommand';
import { ReceiveStockCommand } from '../../application/commands/ReceiveStockCommand';
import { IssueStockCommand } from '../../application/commands/IssueStockCommand';
import { TransferStockCommand } from '../../application/commands/TransferStockCommand';
import { ApiResponse, ApiResponseBuilder } from '../models/responses/ApiResponse';
import { StockLevelResponse } from '../models/responses/StockLevelResponse';
import { AdjustStockRequest } from '../models/requests/AdjustStockRequest';
import { ReceiveStockRequest } from '../models/requests/ReceiveStockRequest';
import { IssueStockRequest } from '../models/requests/IssueStockRequest';
import { TransferStockRequest } from '../models/requests/TransferStockRequest';
import { InventoryItemId } from '../../domain/shared/InventoryItemId';
import { StockLocationId } from '../../domain/shared/StockLocationId';
import { Quantity } from '../../domain/value-objects/Quantity';

export class StockController {
  constructor(private readonly stockService: IStockApplicationService) {}

  public async getStockLevels(inventoryItemId: string): Promise<ApiResponse<ReadonlyArray<StockLevelResponse>>> {
    const result = await this.stockService.getStockLevels(inventoryItemId);
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    
    const levels = result.value!;
    return ApiResponseBuilder.success(levels.map(l => ({
      id: "",
      inventoryItemId: inventoryItemId,
      locationId: l.locationId,
      quantity: l.quantity,
      availableQuantity: l.quantity,
      reservedQuantity: 0,
      quarantinedQuantity: 0,
      totalQuantity: l.quantity,
      lastUpdated: new Date().toISOString(),
    })));
  }

  public async adjustStock(inventoryItemId: string, request: AdjustStockRequest): Promise<ApiResponse<void>> {
    const idResult = InventoryItemId.create(inventoryItemId);
    if (idResult.isFailure) return ApiResponseBuilder.error(idResult.error!.message);

    const locResult = StockLocationId.create(request.locationId);
    if (locResult.isFailure) return ApiResponseBuilder.error(locResult.error!.message);

    const qtyResult = Quantity.create(request.quantity);
    if (qtyResult.isFailure) return ApiResponseBuilder.error(qtyResult.error!.message);

    const command = new AdjustStockCommand(
      idResult.value!,
      locResult.value!,
      qtyResult.value!,
      request.reason
    );
    
    const result = await this.stockService.adjustStock(command);
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    
    return ApiResponseBuilder.success(undefined as void);
  }

  public async receiveStock(inventoryItemId: string, request: ReceiveStockRequest): Promise<ApiResponse<void>> {
    const idResult = InventoryItemId.create(inventoryItemId);
    if (idResult.isFailure) return ApiResponseBuilder.error(idResult.error!.message);

    const locResult = StockLocationId.create(request.locationId);
    if (locResult.isFailure) return ApiResponseBuilder.error(locResult.error!.message);

    const qtyResult = Quantity.create(request.quantity);
    if (qtyResult.isFailure) return ApiResponseBuilder.error(qtyResult.error!.message);

    const command = new ReceiveStockCommand(
      idResult.value!,
      locResult.value!,
      qtyResult.value!,
      undefined
    );
    
    const result = await this.stockService.receiveStock(command);
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    
    return ApiResponseBuilder.success(undefined as void);
  }

  public async issueStock(inventoryItemId: string, request: IssueStockRequest): Promise<ApiResponse<void>> {
    const idResult = InventoryItemId.create(inventoryItemId);
    if (idResult.isFailure) return ApiResponseBuilder.error(idResult.error!.message);

    const locResult = StockLocationId.create(request.locationId);
    if (locResult.isFailure) return ApiResponseBuilder.error(locResult.error!.message);

    const qtyResult = Quantity.create(request.quantity);
    if (qtyResult.isFailure) return ApiResponseBuilder.error(qtyResult.error!.message);

    const command = new IssueStockCommand(
      idResult.value!,
      locResult.value!,
      qtyResult.value!
    );
    
    const result = await this.stockService.issueStock(command);
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    
    return ApiResponseBuilder.success(undefined as void);
  }

  public async transferStock(inventoryItemId: string, request: TransferStockRequest): Promise<ApiResponse<void>> {
    const idResult = InventoryItemId.create(inventoryItemId);
    if (idResult.isFailure) return ApiResponseBuilder.error(idResult.error!.message);

    const srcLocResult = StockLocationId.create(request.sourceLocationId);
    if (srcLocResult.isFailure) return ApiResponseBuilder.error(srcLocResult.error!.message);

    const destLocResult = StockLocationId.create(request.destinationLocationId);
    if (destLocResult.isFailure) return ApiResponseBuilder.error(destLocResult.error!.message);

    const qtyResult = Quantity.create(request.quantity);
    if (qtyResult.isFailure) return ApiResponseBuilder.error(qtyResult.error!.message);

    const command = new TransferStockCommand(
      idResult.value!,
      srcLocResult.value!,
      destLocResult.value!,
      qtyResult.value!
    );
    
    const result = await this.stockService.transferStock(command);
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    
    return ApiResponseBuilder.success(undefined as void);
  }
}
