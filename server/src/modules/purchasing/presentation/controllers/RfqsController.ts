import { IPurchasingApplicationService } from '../../application/services/IPurchasingApplicationService';
import { 
    CreateRfqCommand,
    AddRfqTargetSupplierCommand,
    PublishRfqCommand
} from '../../application/commands';
import { 
    GetRfqByIdQuery,
    GetRfqsQuery
} from '../../application/queries';
import { ApiResponseBuilder } from '../models/responses/ApiResponse';
import { 
    CreateRfqRequest,
    AddRfqTargetSupplierRequest
} from '../models/requests';

export class RfqsController {
    constructor(private readonly applicationService: IPurchasingApplicationService) {}

    async createRfq(request: CreateRfqRequest) {
        const command = new CreateRfqCommand(
            request.itemId,
            request.requiredQuantity,
            new Date(request.requiredByDate)
        );
        const result = await this.applicationService.createRfq(command);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success({ id: result.value });
    }

    async addTargetSupplier(rfqId: string, request: AddRfqTargetSupplierRequest) {
        const command = new AddRfqTargetSupplierCommand(rfqId, request.supplierId);
        const result = await this.applicationService.addRfqTargetSupplier(command);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(null);
    }

    async publishRfq(rfqId: string) {
        const command = new PublishRfqCommand(rfqId);
        const result = await this.applicationService.publishRfq(command);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(null);
    }

    async getRfqById(rfqId: string) {
        const query = new GetRfqByIdQuery(rfqId);
        const result = await this.applicationService.getRfqById(query);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(result.value);
    }

    async getRfqs(queryParams: any) {
        const query = new GetRfqsQuery(queryParams.status);
        const result = await this.applicationService.getRfqs(query);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(result.value);
    }
}
