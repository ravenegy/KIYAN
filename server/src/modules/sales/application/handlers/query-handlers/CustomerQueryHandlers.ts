import { Result } from '../../../../../core/results/Result';
import { CustomerDto } from '../../dto/SalesDtos';
import { GetCustomerByIdQuery, GetCustomersQuery } from '../../queries/SalesQueries';
import { ISalesQueryService } from '../../queries/ISalesQueryService';

export class GetCustomerByIdQueryHandler {
    constructor(private readonly queryService: ISalesQueryService) {}

    async handle(query: GetCustomerByIdQuery): Promise<Result<CustomerDto>> {
        try {
            const customer = await this.queryService.getCustomerById(query.customerId);
            if (!customer) {
                return Result.failure({ code: 'SALES_ERROR', message: 'Customer not found' });
            }
            return Result.success(customer);
        } catch (error: any) {
            return Result.failure({ code: 'SALES_ERROR', message: error.message });
        }
    }
}

export class GetCustomersQueryHandler {
    constructor(private readonly queryService: ISalesQueryService) {}

    async handle(query: GetCustomersQuery): Promise<Result<readonly CustomerDto[]>> {
        try {
            const customers = await this.queryService.getCustomers(query.status);
            return Result.success(customers);
        } catch (error: any) {
            return Result.failure({ code: 'SALES_ERROR', message: error.message });
        }
    }
}
