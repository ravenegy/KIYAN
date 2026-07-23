import { Result } from '../../../core';
import { IMrpCommandService } from '../application/services/IMrpCommandService';
import { IMrpQueryService } from '../application/services/IMrpQueryService';
import { MrpRunDto } from '../application/dto/MrpRunDto';
import { PlannedOrderDto } from '../application/dto/PlannedOrderDto';
import { MaterialRequirementDto } from '../application/dto/MaterialRequirementDto';
import { IMrpIntegrationService, SupplyRecommendationDto, DemandSummaryDto } from './IMrpIntegrationService';

export class MrpIntegrationService implements IMrpIntegrationService {
  constructor(
    private readonly commandService: IMrpCommandService,
    private readonly queryService: IMrpQueryService
  ) {}

  public async createMrpRun(
    plantId: string,
    horizonStartDate: Date,
    horizonEndDate: Date
  ): Promise<Result<string>> {
    return this.commandService.createMrpRun(plantId, horizonStartDate, horizonEndDate);
  }

  public async getMrpRun(mrpRunId: string): Promise<Result<MrpRunDto | null>> {
    return this.queryService.getMrpRunById(mrpRunId);
  }

  public async getMaterialRequirements(mrpRunId: string): Promise<Result<readonly MaterialRequirementDto[]>> {
    return this.queryService.getMaterialRequirements(mrpRunId);
  }

  public async getPlannedOrders(mrpRunId: string): Promise<Result<readonly PlannedOrderDto[]>> {
    return this.queryService.getPlannedOrders(mrpRunId);
  }

  public async getOpenPlannedOrders(itemId?: string): Promise<Result<readonly PlannedOrderDto[]>> {
    // Return planned orders with status "Planned" or "Firmed"
    const result = await this.queryService.searchPlannedOrders(itemId);
    
    if (result.isFailure) {
      return result;
    }
    
    const openOrders = result.value!.filter(order => order.status === 'Planned' || order.status === 'Firmed');
    return Result.success(openOrders);
  }

  public async releasePlannedOrder(plannedOrderId: string): Promise<Result<void>> {
    return this.commandService.releasePlannedOrder(plannedOrderId);
  }

  public async firmPlannedOrder(plannedOrderId: string): Promise<Result<void>> {
    return this.commandService.firmPlannedOrder(plannedOrderId);
  }

  public async cancelPlannedOrder(plannedOrderId: string, reason: string): Promise<Result<void>> {
    return this.commandService.cancelPlannedOrder(plannedOrderId, reason);
  }

  public async getSupplyRecommendations(mrpRunId: string): Promise<Result<readonly SupplyRecommendationDto[]>> {
    const plannedOrdersResult = await this.queryService.getPlannedOrders(mrpRunId);
    
    if (plannedOrdersResult.isFailure) {
      return Result.failure<readonly SupplyRecommendationDto[]>(plannedOrdersResult.error!);
    }
    
    const recommendations = plannedOrdersResult.value!.map(order => ({
      itemId: order.itemId,
      recommendedQuantity: order.quantity,
      requiredDate: order.startDate,
      sourceRequirementId: order.sourceRequirementId || '',
    }));
    
    return Result.success(recommendations);
  }

  public async getDemandSummary(mrpRunId: string): Promise<Result<readonly DemandSummaryDto[]>> {
    const requirementsResult = await this.queryService.getMaterialRequirements(mrpRunId);
    
    if (requirementsResult.isFailure) {
      return Result.failure<readonly DemandSummaryDto[]>(requirementsResult.error!);
    }
    
    const plannedOrdersResult = await this.queryService.getPlannedOrders(mrpRunId);
    
    if (plannedOrdersResult.isFailure) {
      return Result.failure<readonly DemandSummaryDto[]>(plannedOrdersResult.error!);
    }
    
    const itemMap = new Map<string, { demand: number; supply: number }>();
    
    for (const req of requirementsResult.value!) {
      const current = itemMap.get(req.itemId) || { demand: 0, supply: 0 };
      itemMap.set(req.itemId, {
        demand: current.demand + req.quantity,
        supply: current.supply,
      });
    }
    
    for (const order of plannedOrdersResult.value!) {
      const current = itemMap.get(order.itemId) || { demand: 0, supply: 0 };
      itemMap.set(order.itemId, {
        demand: current.demand,
        supply: current.supply + order.quantity,
      });
    }
    
    const summary: DemandSummaryDto[] = [];
    
    for (const [itemId, data] of itemMap.entries()) {
      summary.push({
        itemId,
        totalDemand: data.demand,
        pendingSupply: data.supply,
        netRequirement: Math.max(0, data.demand - data.supply),
      });
    }
    
    return Result.success(summary);
  }
}
