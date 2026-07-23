import { IBomApplicationService } from '../../application/services/IBomApplicationService';
import { CreateBomRequest } from '../models/requests/CreateBomRequest';
import { AddBomComponentRequest } from '../models/requests/AddBomComponentRequest';
import { ApiResponse, ApiResponseBuilder } from '../models/responses/ApiResponse';
import { BomResponse } from '../models/responses/BomResponse';
import { BomSummaryResponse } from '../models/responses/BomSummaryResponse';

export class BomController {
  constructor(private readonly bomService: IBomApplicationService) {}

  public async getBomById(id: string): Promise<ApiResponse<BomResponse>> {
    const result = await this.bomService.getBomById(id);
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    return ApiResponseBuilder.success(result.value! as unknown as BomResponse);
  }

  public async getActiveBomForTarget(targetItemId: string): Promise<ApiResponse<BomResponse>> {
    const result = await this.bomService.getActiveBomForTarget(targetItemId);
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    return ApiResponseBuilder.success(result.value! as unknown as BomResponse);
  }

  public async getBomsForTarget(targetItemId: string): Promise<ApiResponse<ReadonlyArray<BomSummaryResponse>>> {
    const result = await this.bomService.getBomsForTarget(targetItemId);
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    return ApiResponseBuilder.success(result.value! as unknown as ReadonlyArray<BomSummaryResponse>);
  }

  public async createBom(request: CreateBomRequest): Promise<ApiResponse<string>> {
    const result = await this.bomService.createBom(request.name, request.targetItemId);
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    return ApiResponseBuilder.success(result.value!);
  }

  public async addBomComponent(bomId: string, request: AddBomComponentRequest): Promise<ApiResponse<void>> {
    const result = await this.bomService.addBomComponent(
      bomId,
      request.itemId,
      request.quantity,
      request.unitOfMeasure,
      request.scrapPercentage
    );
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    return ApiResponseBuilder.success(undefined as void);
  }

  public async removeBomComponent(bomId: string, itemId: string): Promise<ApiResponse<void>> {
    const result = await this.bomService.removeBomComponent(bomId, itemId);
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    return ApiResponseBuilder.success(undefined as void);
  }

  public async activateBom(bomId: string): Promise<ApiResponse<void>> {
    const result = await this.bomService.activateBom(bomId);
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    return ApiResponseBuilder.success(undefined as void);
  }

  public async archiveBom(bomId: string): Promise<ApiResponse<void>> {
    const result = await this.bomService.archiveBom(bomId);
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    return ApiResponseBuilder.success(undefined as void);
  }
}
