import { IProductionApplicationService } from '../../application/services/IProductionApplicationService';
import { 
    AddOperationCommand,
    UpdateOperationStatusCommand
} from '../../application/commands';
import { 
    GetProductionOperationsQuery
} from '../../application/queries';
import { ApiResponseBuilder } from '../models/responses/ApiResponse';
import { 
    AddOperationRequest,
    UpdateOperationStatusRequest
} from '../models/requests';

export class ProductionOperationController {
    constructor(private readonly applicationService: IProductionApplicationService) {}

    async addOperation(request: AddOperationRequest) {
        const command = new AddOperationCommand(
            request.orderId,
            request.sequence,
            request.name,
            request.workCenterId,
            request.setupTimeMinutes,
            request.runTimeMinutes
        );
        const result = await this.applicationService.addOperation(command);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success({ id: result.value });
    }

    async updateOperationStatus(request: UpdateOperationStatusRequest) {
        const command = new UpdateOperationStatusCommand(
            request.orderId,
            request.operationId,
            request.status
        );
        const result = await this.applicationService.updateOperationStatus(command);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(null);
    }

    async getProductionOperations(orderId: string) {
        const query = new GetProductionOperationsQuery(orderId);
        const result = await this.applicationService.getProductionOperations(query);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(result.value);
    }
}
