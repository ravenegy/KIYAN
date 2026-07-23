import { Result } from '../../../../core/results/Result';
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

export interface IProductionValidator {
    validateCreateProductionOrder(command: CreateProductionOrderCommand): Result<void>;
    validateReleaseProductionOrder(command: ReleaseProductionOrderCommand): Result<void>;
    validateStartProductionOrder(command: StartProductionOrderCommand): Result<void>;
    validateCompleteProductionOrder(command: CompleteProductionOrderCommand): Result<void>;
    validateCancelProductionOrder(command: CancelProductionOrderCommand): Result<void>;
    
    validateAddOperation(command: AddOperationCommand): Result<void>;
    validateAddMaterialIssue(command: AddMaterialIssueCommand): Result<void>;
    validateUpdateOperationStatus(command: UpdateOperationStatusCommand): Result<void>;
    
    validateIssueMaterial(command: IssueMaterialCommand): Result<void>;
    validateReceiveFinishedGoods(command: ReceiveFinishedGoodsCommand): Result<void>;
    
    validateGetProductionOrderById(query: GetProductionOrderByIdQuery): Result<void>;
    validateGetProductionOrders(query: GetProductionOrdersQuery): Result<void>;
    validateGetProductionOperations(query: GetProductionOperationsQuery): Result<void>;
    validateGetMaterialIssues(query: GetMaterialIssuesQuery): Result<void>;
    validateGetFinishedGoodReceipts(query: GetFinishedGoodReceiptsQuery): Result<void>;
}
