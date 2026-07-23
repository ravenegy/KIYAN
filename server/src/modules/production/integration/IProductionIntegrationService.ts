import { Result } from '../../../core/results/Result';
import { 
    ProductionOrderDto, 
    ProductionOperationDto, 
    MaterialIssueDto, 
    FinishedGoodReceiptDto,
    ProductionSummaryDto
} from '../application/dto';

export interface ProductionCapacityDto {
    readonly workCenterId: string;
    readonly date: string;
    readonly totalCapacityMinutes: number;
    readonly allocatedMinutes: number;
    readonly availableMinutes: number;
}

export interface ProductionScheduleDto {
    readonly orderId: string;
    readonly targetItemId: string;
    readonly startDate: string;
    readonly endDate: string;
    readonly operations: readonly {
        readonly operationId: string;
        readonly workCenterId: string;
        readonly startDate: string;
        readonly endDate: string;
    }[];
}

export interface IProductionIntegrationService {
    // Production Orders
    createProductionOrder(
        targetItemId: string,
        plannedQuantity: number,
        startDate: string,
        endDate: string,
        priority: string
    ): Promise<Result<string>>;

    getProductionOrder(orderId: string): Promise<Result<ProductionOrderDto>>;
    
    getProductionOrders(
        status?: string, 
        itemId?: string, 
        locationId?: string, 
        startDate?: string, 
        endDate?: string
    ): Promise<Result<readonly ProductionOrderDto[]>>;

    releaseProductionOrder(orderId: string): Promise<Result<void>>;
    startProductionOrder(orderId: string, actualStartDate: string): Promise<Result<void>>;
    completeProductionOrder(orderId: string, actualEndDate: string): Promise<Result<void>>;
    cancelProductionOrder(orderId: string, reason?: string): Promise<Result<void>>;

    // Operations
    getOperations(orderId: string): Promise<Result<readonly ProductionOperationDto[]>>;
    updateOperationStatus(orderId: string, operationId: string, status: string): Promise<Result<void>>;
    addOperation(
        orderId: string, 
        sequence: number, 
        name: string, 
        workCenterId: string, 
        setupTimeMinutes: number, 
        runTimeMinutes: number
    ): Promise<Result<string>>;

    // Material Issues
    addMaterialIssue(orderId: string, itemId: string, requiredQuantity: number): Promise<Result<string>>;
    issueMaterial(orderId: string, materialIssueId: string, quantity: number): Promise<Result<void>>;
    getMaterialIssues(orderId: string): Promise<Result<readonly MaterialIssueDto[]>>;

    // Finished Goods
    receiveFinishedGoods(orderId: string, itemId: string, quantity: number): Promise<Result<string>>;
    getFinishedGoodsReceipts(orderId: string): Promise<Result<readonly FinishedGoodReceiptDto[]>>;

    // Planning
    getProductionCapacity(workCenterId: string, startDate: string, endDate: string): Promise<Result<readonly ProductionCapacityDto[]>>;
    getProductionSchedule(startDate: string, endDate: string): Promise<Result<readonly ProductionScheduleDto[]>>;
    getProductionProgress(orderId: string): Promise<Result<ProductionSummaryDto>>;
}
