import { IPurchasingApplicationService } from '../../application/services/IPurchasingApplicationService';
import { 
    SubmitQuotationCommand,
    AcceptQuotationCommand
} from '../../application/commands';
import { 
    GetQuotationsByRfqIdQuery
} from '../../application/queries';
import { ApiResponseBuilder } from '../models/responses/ApiResponse';
import { 
    SubmitQuotationRequest
} from '../models/requests';

export class QuotationsController {
    constructor(private readonly applicationService: IPurchasingApplicationService) {}

    async submitQuotation(request: SubmitQuotationRequest) {
        const command = new SubmitQuotationCommand(
            request.rfqId,
            request.supplierId,
            request.unitPrice,
            request.leadTimeDays,
            new Date(request.validUntil)
        );
        const result = await this.applicationService.submitQuotation(command);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success({ id: result.value });
    }

    async acceptQuotation(quotationId: string) {
        const command = new AcceptQuotationCommand(quotationId);
        const result = await this.applicationService.acceptQuotation(command);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(null);
    }

    async getQuotationsByRfqId(rfqId: string) {
        const query = new GetQuotationsByRfqIdQuery(rfqId);
        const result = await this.applicationService.getQuotationsByRfqId(query);
        if (result.isFailure) {
            return ApiResponseBuilder.error(result.error?.message || 'Unknown error');
        }
        return ApiResponseBuilder.success(result.value);
    }
}
