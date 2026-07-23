import { Result } from '../../../../../core/results/Result';
import { SalesInvoiceDto } from '../../dto/SalesDtos';
import { GetSalesInvoiceByIdQuery, GetSalesInvoicesQuery } from '../../queries/SalesQueries';
import { ISalesQueryService } from '../../queries/ISalesQueryService';

export class GetSalesInvoiceByIdQueryHandler {
    constructor(private readonly queryService: ISalesQueryService) {}

    async handle(query: GetSalesInvoiceByIdQuery): Promise<Result<SalesInvoiceDto>> {
        try {
            const invoice = await this.queryService.getSalesInvoiceById(query.invoiceId);
            if (!invoice) {
                return Result.failure({ code: 'SALES_ERROR', message: 'Sales invoice not found' });
            }
            return Result.success(invoice);
        } catch (error: any) {
            return Result.failure({ code: 'SALES_ERROR', message: error.message });
        }
    }
}

export class GetSalesInvoicesQueryHandler {
    constructor(private readonly queryService: ISalesQueryService) {}

    async handle(query: GetSalesInvoicesQuery): Promise<Result<readonly SalesInvoiceDto[]>> {
        try {
            const invoices = await this.queryService.getSalesInvoices(query.salesOrderId, query.customerId, query.status);
            return Result.success(invoices);
        } catch (error: any) {
            return Result.failure({ code: 'SALES_ERROR', message: error.message });
        }
    }
}
