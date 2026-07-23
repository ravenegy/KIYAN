import { Result } from '../../../../core/results/Result';
import { 
    ProductionOrderDto,
    ProductionOperationDto,
    MaterialIssueDto,
    FinishedGoodReceiptDto,
    ProductionSummaryDto
} from '../dto';
import {
    CreateProductionOrderCommand,
    ReleaseProductionOrderCommand,
    StartProductionOrderCommand,
    CompleteProductionOrderCommand,
    CancelProductionOrderCommand,
    IssueMaterialCommand,
    ReceiveFinishedGoodsCommand,
    AddOperationCommand,
    AddMaterialIssueCommand,
    UpdateOperationStatusCommand
} from '../commands';
import {
    GetProductionOrderByIdQuery,
    GetProductionOrdersQuery,
    GetProductionOperationsQuery,
    GetMaterialIssuesQuery,
    GetFinishedGoodReceiptsQuery
} from '../queries';

export interface IProductionApplicationService {
    createProductionOrder(command: CreateProductionOrderCommand): Promise<Result<string>>;
    releaseProductionOrder(command: ReleaseProductionOrderCommand): Promise<Result<void>>;
    startProductionOrder(command: StartProductionOrderCommand): Promise<Result<void>>;
    completeProductionOrder(command: CompleteProductionOrderCommand): Promise<Result<void>>;
    cancelProductionOrder(command: CancelProductionOrderCommand): Promise<Result<void>>;
    
    addOperation(command: AddOperationCommand): Promise<Result<string>>;
    addMaterialIssue(command: AddMaterialIssueCommand): Promise<Result<string>>;
    updateOperationStatus(command: UpdateOperationStatusCommand): Promise<Result<void>>;
    
    issueMaterial(command: IssueMaterialCommand): Promise<Result<void>>;
    receiveFinishedGoods(command: ReceiveFinishedGoodsCommand): Promise<Result<string>>;
    
    getProductionOrderById(query: GetProductionOrderByIdQuery): Promise<Result<ProductionOrderDto>>;
    getProductionOrders(query: GetProductionOrdersQuery): Promise<Result<readonly ProductionOrderDto[]>>;
    getProductionOperations(query: GetProductionOperationsQuery): Promise<Result<readonly ProductionOperationDto[]>>;
    getMaterialIssues(query: GetMaterialIssuesQuery): Promise<Result<readonly MaterialIssueDto[]>>;
    getFinishedGoodReceipts(query: GetFinishedGoodReceiptsQuery): Promise<Result<readonly FinishedGoodReceiptDto[]>>;
}
