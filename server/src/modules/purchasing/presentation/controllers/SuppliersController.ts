import { IPurchasingApplicationService } from '../../application/services/IPurchasingApplicationService';
import { 
    CreateSupplierCommand,
    QualifySupplierCommand,
    SuspendSupplierCommand
} from '../../application/commands';
import { 
    GetSupplierByIdQuery,
    GetSuppliersQuery
} from '../../application/queries';
import { ApiResponseBuilder } from '../models/responses/ApiResponse';
import { 
    CreateSupplierRequest,
    QualifySupplierRequest
} from '../models/requests';

export class SuppliersController {
    constructor(private readonly applicationService: IPurchasingApplicationService) {}

    async createSupplier(request: CreateSupplierRequest) {
        const command = new CreateSupplierCommand(request.name, request.contactEmail);
        const result = await this.applicationService.createSupplier(command);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success({ id: result.value });
    }

    async qualifySupplier(supplierId: string, request: QualifySupplierRequest) {
        const command = new QualifySupplierCommand(supplierId, request.qualificationLevel);
        const result = await this.applicationService.qualifySupplier(command);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(null);
    }

    async suspendSupplier(supplierId: string) {
        const command = new SuspendSupplierCommand(supplierId);
        const result = await this.applicationService.suspendSupplier(command);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(null);
    }

    async getSupplierById(supplierId: string) {
        const query = new GetSupplierByIdQuery(supplierId);
        const result = await this.applicationService.getSupplierById(query);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(result.value);
    }

    async getSuppliers(queryParams: any) {
        const query = new GetSuppliersQuery(queryParams.status, queryParams.qualificationLevel);
        const result = await this.applicationService.getSuppliers(query);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(result.value);
    }
}
