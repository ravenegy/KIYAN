import { IProductionApplicationService } from '../IProductionApplicationService';
import { Result } from '../../../../../core/results/Result';
import {
    ProductionOrderDto,
    ProductionOperationDto,
    MaterialIssueDto,
    FinishedGoodReceiptDto
} from '../../dto';
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
import { IProductionValidator } from '../../validators/IProductionValidator';

import { CreateProductionOrderCommandHandler } from '../../handlers/impl/CreateProductionOrderCommandHandler';
import { ReleaseProductionOrderCommandHandler } from '../../handlers/impl/ReleaseProductionOrderCommandHandler';
import { StartProductionOrderCommandHandler } from '../../handlers/impl/StartProductionOrderCommandHandler';
import { CompleteProductionOrderCommandHandler } from '../../handlers/impl/CompleteProductionOrderCommandHandler';
import { CancelProductionOrderCommandHandler } from '../../handlers/impl/CancelProductionOrderCommandHandler';
import { AddOperationCommandHandler } from '../../handlers/impl/AddOperationCommandHandler';
import { AddMaterialIssueCommandHandler } from '../../handlers/impl/AddMaterialIssueCommandHandler';
import { UpdateOperationStatusCommandHandler } from '../../handlers/impl/UpdateOperationStatusCommandHandler';
import { IssueMaterialCommandHandler } from '../../handlers/impl/IssueMaterialCommandHandler';
import { ReceiveFinishedGoodsCommandHandler } from '../../handlers/impl/ReceiveFinishedGoodsCommandHandler';

import { GetProductionOrderByIdQueryHandler } from '../../handlers/impl/GetProductionOrderByIdQueryHandler';
import { GetProductionOrdersQueryHandler } from '../../handlers/impl/GetProductionOrdersQueryHandler';
import { GetProductionOperationsQueryHandler } from '../../handlers/impl/GetProductionOperationsQueryHandler';
import { GetMaterialIssuesQueryHandler } from '../../handlers/impl/GetMaterialIssuesQueryHandler';
import { GetFinishedGoodReceiptsQueryHandler } from '../../handlers/impl/GetFinishedGoodReceiptsQueryHandler';

export class ProductionApplicationService implements IProductionApplicationService {
    constructor(
        private readonly validator: IProductionValidator,
        
        private readonly createOrderHandler: CreateProductionOrderCommandHandler,
        private readonly releaseOrderHandler: ReleaseProductionOrderCommandHandler,
        private readonly startOrderHandler: StartProductionOrderCommandHandler,
        private readonly completeOrderHandler: CompleteProductionOrderCommandHandler,
        private readonly cancelOrderHandler: CancelProductionOrderCommandHandler,
        private readonly addOperationHandler: AddOperationCommandHandler,
        private readonly addMaterialIssueHandler: AddMaterialIssueCommandHandler,
        private readonly updateOperationStatusHandler: UpdateOperationStatusCommandHandler,
        private readonly issueMaterialHandler: IssueMaterialCommandHandler,
        private readonly receiveFinishedGoodsHandler: ReceiveFinishedGoodsCommandHandler,
        
        private readonly getOrderByIdHandler: GetProductionOrderByIdQueryHandler,
        private readonly getOrdersHandler: GetProductionOrdersQueryHandler,
        private readonly getOperationsHandler: GetProductionOperationsQueryHandler,
        private readonly getMaterialIssuesHandler: GetMaterialIssuesQueryHandler,
        private readonly getReceiptsHandler: GetFinishedGoodReceiptsQueryHandler
    ) {}

    public async createProductionOrder(command: CreateProductionOrderCommand): Promise<Result<string>> {
        const validationResult = this.validator.validateCreateProductionOrder(command);
        if (validationResult.isFailure) return validationResult as any;
        return this.createOrderHandler.handle(command);
    }

    public async releaseProductionOrder(command: ReleaseProductionOrderCommand): Promise<Result<void>> {
        const validationResult = this.validator.validateReleaseProductionOrder(command);
        if (validationResult.isFailure) return validationResult;
        return this.releaseOrderHandler.handle(command);
    }

    public async startProductionOrder(command: StartProductionOrderCommand): Promise<Result<void>> {
        const validationResult = this.validator.validateStartProductionOrder(command);
        if (validationResult.isFailure) return validationResult;
        return this.startOrderHandler.handle(command);
    }

    public async completeProductionOrder(command: CompleteProductionOrderCommand): Promise<Result<void>> {
        const validationResult = this.validator.validateCompleteProductionOrder(command);
        if (validationResult.isFailure) return validationResult;
        return this.completeOrderHandler.handle(command);
    }

    public async cancelProductionOrder(command: CancelProductionOrderCommand): Promise<Result<void>> {
        const validationResult = this.validator.validateCancelProductionOrder(command);
        if (validationResult.isFailure) return validationResult;
        return this.cancelOrderHandler.handle(command);
    }

    public async addOperation(command: AddOperationCommand): Promise<Result<string>> {
        const validationResult = this.validator.validateAddOperation(command);
        if (validationResult.isFailure) return validationResult as any;
        return this.addOperationHandler.handle(command);
    }

    public async addMaterialIssue(command: AddMaterialIssueCommand): Promise<Result<string>> {
        const validationResult = this.validator.validateAddMaterialIssue(command);
        if (validationResult.isFailure) return validationResult as any;
        return this.addMaterialIssueHandler.handle(command);
    }

    public async updateOperationStatus(command: UpdateOperationStatusCommand): Promise<Result<void>> {
        const validationResult = this.validator.validateUpdateOperationStatus(command);
        if (validationResult.isFailure) return validationResult;
        return this.updateOperationStatusHandler.handle(command);
    }

    public async issueMaterial(command: IssueMaterialCommand): Promise<Result<void>> {
        const validationResult = this.validator.validateIssueMaterial(command);
        if (validationResult.isFailure) return validationResult;
        return this.issueMaterialHandler.handle(command);
    }

    public async receiveFinishedGoods(command: ReceiveFinishedGoodsCommand): Promise<Result<string>> {
        const validationResult = this.validator.validateReceiveFinishedGoods(command);
        if (validationResult.isFailure) return validationResult as any;
        return this.receiveFinishedGoodsHandler.handle(command);
    }

    public async getProductionOrderById(query: GetProductionOrderByIdQuery): Promise<Result<ProductionOrderDto>> {
        const validationResult = this.validator.validateGetProductionOrderById(query);
        if (validationResult.isFailure) return validationResult as any;
        return this.getOrderByIdHandler.handle(query);
    }

    public async getProductionOrders(query: GetProductionOrdersQuery): Promise<Result<readonly ProductionOrderDto[]>> {
        const validationResult = this.validator.validateGetProductionOrders(query);
        if (validationResult.isFailure) return validationResult as any;
        return this.getOrdersHandler.handle(query);
    }

    public async getProductionOperations(query: GetProductionOperationsQuery): Promise<Result<readonly ProductionOperationDto[]>> {
        const validationResult = this.validator.validateGetProductionOperations(query);
        if (validationResult.isFailure) return validationResult as any;
        return this.getOperationsHandler.handle(query);
    }

    public async getMaterialIssues(query: GetMaterialIssuesQuery): Promise<Result<readonly MaterialIssueDto[]>> {
        const validationResult = this.validator.validateGetMaterialIssues(query);
        if (validationResult.isFailure) return validationResult as any;
        return this.getMaterialIssuesHandler.handle(query);
    }

    public async getFinishedGoodReceipts(query: GetFinishedGoodReceiptsQuery): Promise<Result<readonly FinishedGoodReceiptDto[]>> {
        const validationResult = this.validator.validateGetFinishedGoodReceipts(query);
        if (validationResult.isFailure) return validationResult as any;
        return this.getReceiptsHandler.handle(query);
    }
}
