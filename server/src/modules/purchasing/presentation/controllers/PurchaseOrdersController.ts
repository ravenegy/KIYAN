import { IPurchasingApplicationService } from '../../application/services/IPurchasingApplicationService';
import { 
    CreatePurchaseOrderCommand,
    AddPurchaseOrderLineCommand,
    SubmitPurchaseOrderCommand,
    ApprovePurchaseOrderCommand,
    RejectPurchaseOrderCommand,
    CancelPurchaseOrderCommand,
    IssuePurchaseOrderCommand,
    ReceiveGoodsCommand
} from '../../application/commands';
import { 
    GetPurchaseOrderByIdQuery,
    GetPurchaseOrdersQuery
} from '../../application/queries';
import { ApiResponseBuilder } from '../models/responses/ApiResponse';
import { 
    CreatePurchaseOrderRequest,
    AddPurchaseOrderLineRequest,
    ApprovePurchaseOrderRequest,
    CancelPurchaseOrderRequest,
    ReceiveGoodsRequest
} from '../models/requests';

export class PurchaseOrdersController {
    constructor(private readonly applicationService: IPurchasingApplicationService) {}

    async createPurchaseOrder(request: CreatePurchaseOrderRequest) {
        const command = new CreatePurchaseOrderCommand(
            request.supplierId,
            new Date(request.expectedDeliveryDate),
            request.notes
        );
        const result = await this.applicationService.createPurchaseOrder(command);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success({ id: result.value });
    }

    async addPurchaseOrderLine(orderId: string, request: AddPurchaseOrderLineRequest) {
        const command = new AddPurchaseOrderLineCommand(
            orderId,
            request.itemId,
            request.quantity,
            request.unitPrice,
            new Date(request.expectedDeliveryDate)
        );
        const result = await this.applicationService.addPurchaseOrderLine(command);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(null);
    }

    async submitPurchaseOrder(orderId: string) {
        const command = new SubmitPurchaseOrderCommand(orderId);
        const result = await this.applicationService.submitPurchaseOrder(command);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(null);
    }

    async approvePurchaseOrder(orderId: string, request: ApprovePurchaseOrderRequest) {
        const command = new ApprovePurchaseOrderCommand(orderId, request.approvedBy);
        const result = await this.applicationService.approvePurchaseOrder(command);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(null);
    }

    async rejectPurchaseOrder(orderId: string) {
        const command = new RejectPurchaseOrderCommand(orderId);
        const result = await this.applicationService.rejectPurchaseOrder(command);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(null);
    }

    async cancelPurchaseOrder(orderId: string, request: CancelPurchaseOrderRequest) {
        const command = new CancelPurchaseOrderCommand(orderId, request.reason);
        const result = await this.applicationService.cancelPurchaseOrder(command);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(null);
    }

    async issuePurchaseOrder(orderId: string) {
        const command = new IssuePurchaseOrderCommand(orderId);
        const result = await this.applicationService.issuePurchaseOrder(command);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(null);
    }

    async receiveGoods(orderId: string, request: ReceiveGoodsRequest) {
        const command = new ReceiveGoodsCommand(orderId, request.lineId, request.quantity);
        const result = await this.applicationService.receiveGoods(command);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(null);
    }

    async getPurchaseOrderById(orderId: string) {
        const query = new GetPurchaseOrderByIdQuery(orderId);
        const result = await this.applicationService.getPurchaseOrderById(query);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(result.value);
    }

    async getPurchaseOrders(queryParams: any) {
        const query = new GetPurchaseOrdersQuery(queryParams.status, queryParams.supplierId);
        const result = await this.applicationService.getPurchaseOrders(query);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(result.value);
    }
}
