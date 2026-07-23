import { IProductionValidator } from '../IProductionValidator';
import { ResultFactory } from '../../../../../core/results/ResultFactory';
import { Result } from '../../../../../core/results/Result';
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
} from '../../commands';
import {
    GetProductionOrderByIdQuery,
    GetProductionOrdersQuery,
    GetProductionOperationsQuery,
    GetMaterialIssuesQuery,
    GetFinishedGoodReceiptsQuery
} from '../../queries';
import { ProductionPriority, OperationStatus } from '../../../domain/enums';

export class ProductionValidator implements IProductionValidator {
    public validateCreateProductionOrder(command: CreateProductionOrderCommand): Result<void> {
        if (!command.targetItemId) return ResultFactory.validation('targetItemId is required');
        if (command.plannedQuantity <= 0) return ResultFactory.validation('plannedQuantity must be greater than zero');
        if (!command.startDate) return ResultFactory.validation('startDate is required');
        if (!command.endDate) return ResultFactory.validation('endDate is required');
        if (!Object.values(ProductionPriority).includes(command.priority as ProductionPriority)) {
            return ResultFactory.validation('priority is invalid');
        }
        return ResultFactory.success();
    }

    public validateReleaseProductionOrder(command: ReleaseProductionOrderCommand): Result<void> {
        if (!command.orderId) return ResultFactory.validation('orderId is required');
        return ResultFactory.success();
    }

    public validateStartProductionOrder(command: StartProductionOrderCommand): Result<void> {
        if (!command.orderId) return ResultFactory.validation('orderId is required');
        if (!command.actualStartDate) return ResultFactory.validation('actualStartDate is required');
        return ResultFactory.success();
    }

    public validateCompleteProductionOrder(command: CompleteProductionOrderCommand): Result<void> {
        if (!command.orderId) return ResultFactory.validation('orderId is required');
        if (!command.actualEndDate) return ResultFactory.validation('actualEndDate is required');
        return ResultFactory.success();
    }

    public validateCancelProductionOrder(command: CancelProductionOrderCommand): Result<void> {
        if (!command.orderId) return ResultFactory.validation('orderId is required');
        if (!command.reason) return ResultFactory.validation('reason is required');
        return ResultFactory.success();
    }

    public validateAddOperation(command: AddOperationCommand): Result<void> {
        if (!command.orderId) return ResultFactory.validation('orderId is required');
        if (command.sequence <= 0) return ResultFactory.validation('sequence must be greater than zero');
        if (!command.name) return ResultFactory.validation('name is required');
        if (!command.workCenterId) return ResultFactory.validation('workCenterId is required');
        if (command.setupTimeMinutes < 0) return ResultFactory.validation('setupTimeMinutes cannot be negative');
        if (command.runTimeMinutes < 0) return ResultFactory.validation('runTimeMinutes cannot be negative');
        return ResultFactory.success();
    }

    public validateAddMaterialIssue(command: AddMaterialIssueCommand): Result<void> {
        if (!command.orderId) return ResultFactory.validation('orderId is required');
        if (!command.itemId) return ResultFactory.validation('itemId is required');
        if (command.requiredQuantity <= 0) return ResultFactory.validation('requiredQuantity must be greater than zero');
        return ResultFactory.success();
    }

    public validateUpdateOperationStatus(command: UpdateOperationStatusCommand): Result<void> {
        if (!command.orderId) return ResultFactory.validation('orderId is required');
        if (!command.operationId) return ResultFactory.validation('operationId is required');
        if (!Object.values(OperationStatus).includes(command.status as OperationStatus)) {
            return ResultFactory.validation('status is invalid');
        }
        return ResultFactory.success();
    }

    public validateIssueMaterial(command: IssueMaterialCommand): Result<void> {
        if (!command.orderId) return ResultFactory.validation('orderId is required');
        if (!command.materialIssueId) return ResultFactory.validation('materialIssueId is required');
        if (command.quantity <= 0) return ResultFactory.validation('quantity must be greater than zero');
        return ResultFactory.success();
    }

    public validateReceiveFinishedGoods(command: ReceiveFinishedGoodsCommand): Result<void> {
        if (!command.orderId) return ResultFactory.validation('orderId is required');
        if (!command.itemId) return ResultFactory.validation('itemId is required');
        if (command.quantity <= 0) return ResultFactory.validation('quantity must be greater than zero');
        return ResultFactory.success();
    }

    public validateGetProductionOrderById(query: GetProductionOrderByIdQuery): Result<void> {
        if (!query.orderId) return ResultFactory.validation('orderId is required');
        return ResultFactory.success();
    }

    public validateGetProductionOrders(query: GetProductionOrdersQuery): Result<void> {
        return ResultFactory.success();
    }

    public validateGetProductionOperations(query: GetProductionOperationsQuery): Result<void> {
        if (!query.orderId) return ResultFactory.validation('orderId is required');
        return ResultFactory.success();
    }

    public validateGetMaterialIssues(query: GetMaterialIssuesQuery): Result<void> {
        if (!query.orderId) return ResultFactory.validation('orderId is required');
        return ResultFactory.success();
    }

    public validateGetFinishedGoodReceipts(query: GetFinishedGoodReceiptsQuery): Result<void> {
        if (!query.orderId) return ResultFactory.validation('orderId is required');
        return ResultFactory.success();
    }
}
