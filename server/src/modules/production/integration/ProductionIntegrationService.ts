import { Result } from '../../../core/results/Result';
import { IProductionIntegrationService, ProductionCapacityDto, ProductionScheduleDto } from './IProductionIntegrationService';
import { IProductionApplicationService } from '../application/services/IProductionApplicationService';
import { 
    ProductionOrderDto, 
    ProductionOperationDto, 
    MaterialIssueDto, 
    FinishedGoodReceiptDto,
    ProductionSummaryDto
} from '../application/dto';
import {
    CreateProductionOrderCommand,
    ReleaseProductionOrderCommand,
    StartProductionOrderCommand,
    CompleteProductionOrderCommand,
    CancelProductionOrderCommand,
    AddOperationCommand,
    UpdateOperationStatusCommand,
    AddMaterialIssueCommand,
    IssueMaterialCommand,
    ReceiveFinishedGoodsCommand
} from '../application/commands';
import {
    GetProductionOrderByIdQuery,
    GetProductionOrdersQuery,
    GetProductionOperationsQuery,
    GetMaterialIssuesQuery,
    GetFinishedGoodReceiptsQuery
} from '../application/queries';

export class ProductionIntegrationService implements IProductionIntegrationService {
    constructor(private readonly applicationService: IProductionApplicationService) {}

    async createProductionOrder(
        targetItemId: string,
        plannedQuantity: number,
        startDate: string,
        endDate: string,
        priority: string
    ): Promise<Result<string>> {
        const command = new CreateProductionOrderCommand(targetItemId, plannedQuantity, startDate, endDate, priority);
        return await this.applicationService.createProductionOrder(command);
    }

    async getProductionOrder(orderId: string): Promise<Result<ProductionOrderDto>> {
        const query = new GetProductionOrderByIdQuery(orderId);
        return await this.applicationService.getProductionOrderById(query);
    }

    async getProductionOrders(
        status?: string, 
        itemId?: string, 
        locationId?: string, 
        startDate?: string, 
        endDate?: string
    ): Promise<Result<readonly ProductionOrderDto[]>> {
        const query = new GetProductionOrdersQuery(status, itemId, locationId, startDate, endDate);
        return await this.applicationService.getProductionOrders(query);
    }

    async releaseProductionOrder(orderId: string): Promise<Result<void>> {
        const command = new ReleaseProductionOrderCommand(orderId);
        return await this.applicationService.releaseProductionOrder(command);
    }

    async startProductionOrder(orderId: string, actualStartDate: string): Promise<Result<void>> {
        const command = new StartProductionOrderCommand(orderId, actualStartDate);
        return await this.applicationService.startProductionOrder(command);
    }

    async completeProductionOrder(orderId: string, actualEndDate: string): Promise<Result<void>> {
        const command = new CompleteProductionOrderCommand(orderId, actualEndDate);
        return await this.applicationService.completeProductionOrder(command);
    }

    async cancelProductionOrder(orderId: string, reason?: string): Promise<Result<void>> {
        const command = new CancelProductionOrderCommand(orderId, reason);
        return await this.applicationService.cancelProductionOrder(command);
    }

    async getOperations(orderId: string): Promise<Result<readonly ProductionOperationDto[]>> {
        const query = new GetProductionOperationsQuery(orderId);
        return await this.applicationService.getProductionOperations(query);
    }

    async updateOperationStatus(orderId: string, operationId: string, status: string): Promise<Result<void>> {
        const command = new UpdateOperationStatusCommand(orderId, operationId, status);
        return await this.applicationService.updateOperationStatus(command);
    }

    async addOperation(
        orderId: string, 
        sequence: number, 
        name: string, 
        workCenterId: string, 
        setupTimeMinutes: number, 
        runTimeMinutes: number
    ): Promise<Result<string>> {
        const command = new AddOperationCommand(orderId, sequence, name, workCenterId, setupTimeMinutes, runTimeMinutes);
        return await this.applicationService.addOperation(command);
    }

    async addMaterialIssue(orderId: string, itemId: string, requiredQuantity: number): Promise<Result<string>> {
        const command = new AddMaterialIssueCommand(orderId, itemId, requiredQuantity);
        return await this.applicationService.addMaterialIssue(command);
    }

    async issueMaterial(orderId: string, materialIssueId: string, quantity: number): Promise<Result<void>> {
        const command = new IssueMaterialCommand(orderId, materialIssueId, quantity);
        return await this.applicationService.issueMaterial(command);
    }

    async getMaterialIssues(orderId: string): Promise<Result<readonly MaterialIssueDto[]>> {
        const query = new GetMaterialIssuesQuery(orderId);
        return await this.applicationService.getMaterialIssues(query);
    }

    async receiveFinishedGoods(orderId: string, itemId: string, quantity: number): Promise<Result<string>> {
        const command = new ReceiveFinishedGoodsCommand(orderId, itemId, quantity);
        return await this.applicationService.receiveFinishedGoods(command);
    }

    async getFinishedGoodsReceipts(orderId: string): Promise<Result<readonly FinishedGoodReceiptDto[]>> {
        const query = new GetFinishedGoodReceiptsQuery(orderId);
        return await this.applicationService.getFinishedGoodReceipts(query);
    }

    async getProductionCapacity(workCenterId: string, startDate: string, endDate: string): Promise<Result<readonly ProductionCapacityDto[]>> {
        // Dummy implementation to fulfill the contract, since this logic isn't in the Application service currently
        return Result.success([]);
    }

    async getProductionSchedule(startDate: string, endDate: string): Promise<Result<readonly ProductionScheduleDto[]>> {
        // Dummy implementation to fulfill the contract
        return Result.success([]);
    }

    async getProductionProgress(orderId: string): Promise<Result<ProductionSummaryDto>> {
        // Create a summary from the order DTO
        const orderResult = await this.getProductionOrder(orderId);
        if (orderResult.isFailure) {
            return Result.failure(orderResult.error!);
        }
        
        const order = orderResult.value!;
        let percentComplete = 0;
        
        if (order.plannedQuantity > 0) {
            percentComplete = Math.min(100, Math.round((order.actualQuantity / order.plannedQuantity) * 100));
        }

        const summary: ProductionSummaryDto = {
            orderId: order.id,
            targetItemId: order.targetItemId,
            status: order.status,
            plannedQuantity: order.plannedQuantity,
            actualQuantity: order.actualQuantity,
            percentComplete
        };

        return Result.success(summary);
    }
}
