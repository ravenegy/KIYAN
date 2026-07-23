import { IProductionApplicationService } from '../../application/services/IProductionApplicationService';
import { 
    CreateProductionOrderCommand,
    ReleaseProductionOrderCommand,
    StartProductionOrderCommand,
    CompleteProductionOrderCommand,
    CancelProductionOrderCommand,
    AddMaterialIssueCommand,
    IssueMaterialCommand,
    ReceiveFinishedGoodsCommand
} from '../../application/commands';
import { 
    GetProductionOrderByIdQuery,
    GetProductionOrdersQuery,
    GetMaterialIssuesQuery,
    GetFinishedGoodReceiptsQuery
} from '../../application/queries';
import { ApiResponseBuilder } from '../models/responses/ApiResponse';
import { PagedResponse } from '../models/responses/PagedResponse';
import { 
    CreateProductionOrderRequest,
    ReleaseProductionOrderRequest,
    StartProductionOrderRequest,
    CompleteProductionOrderRequest,
    CancelProductionOrderRequest,
    AddMaterialIssueRequest,
    IssueMaterialRequest,
    ReceiveFinishedGoodsRequest
} from '../models/requests';

export class ProductionController {
    constructor(private readonly applicationService: IProductionApplicationService) {}

    async createProductionOrder(request: CreateProductionOrderRequest) {
        const command = new CreateProductionOrderCommand(
            request.targetItemId,
            request.plannedQuantity,
            request.startDate,
            request.endDate,
            request.priority || 'Normal'
        );
        const result = await this.applicationService.createProductionOrder(command);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success({ id: result.value });
    }

    async getProductionOrderById(id: string) {
        const query = new GetProductionOrderByIdQuery(id);
        const result = await this.applicationService.getProductionOrderById(query);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(result.value);
    }

    async getProductionOrders(queryArgs: any) {
        const query = new GetProductionOrdersQuery(
            queryArgs.status,
            queryArgs.itemId,
            queryArgs.locationId,
            queryArgs.startDate,
            queryArgs.endDate
        );
        const result = await this.applicationService.getProductionOrders(query);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        // Since getProductionOrders returns readonly ProductionOrderDto[], wrap it if needed or return directly
        // The Prompt says PagedResponse but the service returns an array directly, so we map it.
        const items = result.value || [];
        const pagedResponse: PagedResponse<any> = {
            items,
            total: items.length,
            page: 1,
            pageSize: items.length,
            totalPages: 1
        };
        return ApiResponseBuilder.success(pagedResponse);
    }

    async releaseProductionOrder(request: ReleaseProductionOrderRequest) {
        const command = new ReleaseProductionOrderCommand(request.orderId);
        const result = await this.applicationService.releaseProductionOrder(command);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(null);
    }

    async startProductionOrder(request: StartProductionOrderRequest) {
        const command = new StartProductionOrderCommand(request.orderId, request.actualStartDate || new Date().toISOString());
        const result = await this.applicationService.startProductionOrder(command);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(null);
    }

    async completeProductionOrder(request: CompleteProductionOrderRequest) {
        const command = new CompleteProductionOrderCommand(request.orderId, request.actualEndDate || new Date().toISOString());
        const result = await this.applicationService.completeProductionOrder(command);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(null);
    }

    async cancelProductionOrder(request: CancelProductionOrderRequest) {
        const command = new CancelProductionOrderCommand(request.orderId, request.reason);
        const result = await this.applicationService.cancelProductionOrder(command);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(null);
    }

    async addMaterialIssue(request: AddMaterialIssueRequest) {
        const command = new AddMaterialIssueCommand(
            request.orderId,
            request.itemId,
            request.requiredQuantity
        );
        const result = await this.applicationService.addMaterialIssue(command);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success({ id: result.value });
    }

    async issueMaterial(request: IssueMaterialRequest) {
        const command = new IssueMaterialCommand(
            request.orderId,
            request.materialIssueId,
            request.quantity
        );
        const result = await this.applicationService.issueMaterial(command);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(null);
    }

    async receiveFinishedGoods(request: ReceiveFinishedGoodsRequest) {
        const command = new ReceiveFinishedGoodsCommand(
            request.orderId,
            request.itemId,
            request.quantity
        );
        const result = await this.applicationService.receiveFinishedGoods(command);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success({ id: result.value });
    }

    async getMaterialIssues(orderId: string) {
        const query = new GetMaterialIssuesQuery(orderId);
        const result = await this.applicationService.getMaterialIssues(query);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(result.value);
    }

    async getFinishedGoodReceipts(orderId: string) {
        const query = new GetFinishedGoodReceiptsQuery(orderId);
        const result = await this.applicationService.getFinishedGoodReceipts(query);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(result.value);
    }
}
