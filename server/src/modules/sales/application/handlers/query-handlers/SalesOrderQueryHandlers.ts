import { Result } from '../../../../../core/results/Result';
import { SalesOrderDto } from '../../dto/SalesDtos';
import { GetSalesOrderByIdQuery, GetSalesOrdersQuery } from '../../queries/SalesQueries';
import { ISalesQueryService } from '../../queries/ISalesQueryService';

export class GetSalesOrderByIdQueryHandler {
    constructor(private readonly queryService: ISalesQueryService) {}

    async handle(query: GetSalesOrderByIdQuery): Promise<Result<SalesOrderDto>> {
        try {
            const order = await this.queryService.getSalesOrderById(query.orderId);
            if (!order) {
                return Result.failure({ code: 'SALES_ERROR', message: 'Sales order not found' });
            }
            return Result.success(order);
        } catch (error: any) {
            return Result.failure({ code: 'SALES_ERROR', message: error.message });
        }
    }
}

export class GetSalesOrdersQueryHandler {
    constructor(private readonly queryService: ISalesQueryService) {}

    async handle(query: GetSalesOrdersQuery): Promise<Result<readonly SalesOrderDto[]>> {
        try {
            const orders = await this.queryService.getSalesOrders(query.customerId, query.status);
            return Result.success(orders);
        } catch (error: any) {
            return Result.failure({ code: 'SALES_ERROR', message: error.message });
        }
    }
}
