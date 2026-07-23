import { Result } from '../../../../../core/results/Result';
import { GetPurchaseOrdersQuery } from '../../queries';
import { PurchaseOrderDto } from '../../dto';
import { IPurchaseOrderRepository } from '../../../domain/repositories';
import { IPurchasingMapper } from '../../mappers';

export class GetPurchaseOrdersQueryHandler {
    constructor(
        private readonly purchaseOrderRepository: IPurchaseOrderRepository,
        private readonly mapper: IPurchasingMapper
    ) {}

    async handle(query: GetPurchaseOrdersQuery): Promise<Result<readonly PurchaseOrderDto[]>> {
        try {
            let orders = await this.purchaseOrderRepository.findAll();
            if (query.status) {
                orders = orders.filter(o => o.status === query.status);
            }
            if (query.supplierId) {
                orders = orders.filter(o => o.supplierId.value === query.supplierId);
            }
            return Result.success(orders.map(o => this.mapper.toPurchaseOrderDto(o)));
        } catch (error: any) {
            return Result.failure({ code: 'QUERY_FAILED', message: error.message });
        }
    }
}
