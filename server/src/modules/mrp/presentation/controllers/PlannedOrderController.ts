import { IMrpCommandService } from '../../application/services/IMrpCommandService';
import { IMrpQueryService } from '../../application/services/IMrpQueryService';
import { CreatePlannedOrderRequest } from '../models/requests/CreatePlannedOrderRequest';
import { CancelPlannedOrderRequest } from '../models/requests/CancelPlannedOrderRequest';
import { ApiResponse, ApiResponseBuilder } from '../models/responses/ApiResponse';
import { PlannedOrderResponse } from '../models/responses/PlannedOrderResponse';

export class PlannedOrderController {
  constructor(
    private readonly commandService: IMrpCommandService,
    private readonly queryService: IMrpQueryService
  ) {}

  public async getPlannedOrderById(id: string): Promise<ApiResponse<PlannedOrderResponse>> {
    const result = await this.queryService.getPlannedOrderById(id);
    
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    
    return ApiResponseBuilder.success(result.value! as unknown as PlannedOrderResponse);
  }

  public async getPlannedOrdersByMrpRun(mrpRunId: string): Promise<ApiResponse<ReadonlyArray<PlannedOrderResponse>>> {
    const result = await this.queryService.getPlannedOrders(mrpRunId);
    
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    
    return ApiResponseBuilder.success(result.value! as unknown as ReadonlyArray<PlannedOrderResponse>);
  }

  public async searchPlannedOrders(itemId?: string, status?: string, typeFilter?: string): Promise<ApiResponse<ReadonlyArray<PlannedOrderResponse>>> {
    const result = await this.queryService.searchPlannedOrders(itemId, status, typeFilter);
    
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    
    return ApiResponseBuilder.success(result.value! as unknown as ReadonlyArray<PlannedOrderResponse>);
  }

  public async createPlannedOrder(request: CreatePlannedOrderRequest): Promise<ApiResponse<string>> {
    const startDate = new Date(request.startDate);
    const endDate = new Date(request.endDate);

    const result = await this.commandService.createPlannedOrder(
      request.itemId,
      request.quantity,
      startDate,
      endDate,
      request.orderType,
      request.mrpRunId,
      request.sourceRequirementId
    );
    
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    
    return ApiResponseBuilder.success(result.value!);
  }

  public async firmPlannedOrder(id: string): Promise<ApiResponse<void>> {
    const result = await this.commandService.firmPlannedOrder(id);
    
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    
    return ApiResponseBuilder.success(undefined as void);
  }

  public async releasePlannedOrder(id: string): Promise<ApiResponse<void>> {
    const result = await this.commandService.releasePlannedOrder(id);
    
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    
    return ApiResponseBuilder.success(undefined as void);
  }

  public async cancelPlannedOrder(id: string, request: CancelPlannedOrderRequest): Promise<ApiResponse<void>> {
    const result = await this.commandService.cancelPlannedOrder(id, request.reason);
    
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    
    return ApiResponseBuilder.success(undefined as void);
  }
}
