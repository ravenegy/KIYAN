import { Result } from '../../../../../core/results/Result';
import { SalesQuotationDto } from '../../dto/SalesDtos';
import { GetSalesQuotationByIdQuery, GetSalesQuotationsQuery } from '../../queries/SalesQueries';
import { ISalesQueryService } from '../../queries/ISalesQueryService';

export class GetSalesQuotationByIdQueryHandler {
    constructor(private readonly queryService: ISalesQueryService) {}

    async handle(query: GetSalesQuotationByIdQuery): Promise<Result<SalesQuotationDto>> {
        try {
            const quotation = await this.queryService.getSalesQuotationById(query.quotationId);
            if (!quotation) {
                return Result.failure({ code: 'SALES_ERROR', message: 'Sales quotation not found' });
            }
            return Result.success(quotation);
        } catch (error: any) {
            return Result.failure({ code: 'SALES_ERROR', message: error.message });
        }
    }
}

export class GetSalesQuotationsQueryHandler {
    constructor(private readonly queryService: ISalesQueryService) {}

    async handle(query: GetSalesQuotationsQuery): Promise<Result<readonly SalesQuotationDto[]>> {
        try {
            const quotations = await this.queryService.getSalesQuotations(query.customerId, query.status);
            return Result.success(quotations);
        } catch (error: any) {
            return Result.failure({ code: 'SALES_ERROR', message: error.message });
        }
    }
}
