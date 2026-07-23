import { IMrpCommandService } from '../../application/services/IMrpCommandService';
import { IMrpQueryService } from '../../application/services/IMrpQueryService';
import { CreateMrpRunRequest } from '../models/requests/CreateMrpRunRequest';
import { CompleteMrpRunRequest } from '../models/requests/CompleteMrpRunRequest';
import { CancelMrpRunRequest } from '../models/requests/CancelMrpRunRequest';
import { ApiResponse, ApiResponseBuilder } from '../models/responses/ApiResponse';
import { MrpRunResponse } from '../models/responses/MrpRunResponse';
import { MaterialRequirementResponse } from '../models/responses/MaterialRequirementResponse';

export class MrpController {
  constructor(
    private readonly commandService: IMrpCommandService,
    private readonly queryService: IMrpQueryService
  ) {}

  public async getMrpRunById(id: string): Promise<ApiResponse<MrpRunResponse>> {
    const result = await this.queryService.getMrpRunById(id);
    
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    
    return ApiResponseBuilder.success(result.value! as unknown as MrpRunResponse);
  }

  public async getMaterialRequirements(mrpRunId: string): Promise<ApiResponse<ReadonlyArray<MaterialRequirementResponse>>> {
    const result = await this.queryService.getMaterialRequirements(mrpRunId);
    
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    
    return ApiResponseBuilder.success(result.value! as unknown as ReadonlyArray<MaterialRequirementResponse>);
  }

  public async createMrpRun(request: CreateMrpRunRequest): Promise<ApiResponse<string>> {
    const horizonStartDate = new Date(request.horizonStartDate);
    const horizonEndDate = new Date(request.horizonEndDate);

    const result = await this.commandService.createMrpRun(
      request.plantId,
      horizonStartDate,
      horizonEndDate
    );
    
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    
    return ApiResponseBuilder.success(result.value!);
  }

  public async startMrpRun(id: string): Promise<ApiResponse<void>> {
    const result = await this.commandService.startMrpRun(id);
    
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    
    return ApiResponseBuilder.success(undefined as void);
  }

  public async completeMrpRun(id: string, request: CompleteMrpRunRequest): Promise<ApiResponse<void>> {
    const result = await this.commandService.completeMrpRun(id, request.plannedOrdersCount);
    
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    
    return ApiResponseBuilder.success(undefined as void);
  }

  public async cancelMrpRun(id: string, request: CancelMrpRunRequest): Promise<ApiResponse<void>> {
    const result = await this.commandService.cancelMrpRun(id, request.reason);
    
    if (result.isFailure) {
      return ApiResponseBuilder.error(result.error!.message, result.errors?.map(e => e.message));
    }
    
    return ApiResponseBuilder.success(undefined as void);
  }
}
