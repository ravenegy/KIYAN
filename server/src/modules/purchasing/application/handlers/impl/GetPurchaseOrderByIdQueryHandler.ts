import { Result } from '../../../../../core/results/Result';
import { GetPurchaseOrderByIdQuery } from '../../queries';
import { PurchaseOrderDto } from '../../dto';
import { IPurchaseOrderRepository } from '../../../domain/repositories';
import { IPurchasingMapper } from '../../mappers';
import { PurchaseOrderId } from '../../../domain/shared';

export class GetPurchaseOrderByIdQueryHandler {
    constructor(
        private readonly purchaseOrderRepository: IPurchaseOrderRepository,
        private readonly mapper: IPurchasingMapper
    ) {}

    async handle(query: GetPurchaseOrderByIdQuery): Promise<Result<PurchaseOrderDto>> {
        try {
            const order = await this.purchaseOrderRepository.findById(new PurchaseOrderId(query.orderId));
            if (!order) {
                return Result.failure({ code: 'ORDER_NOT_FOUND', message: `Order ${query.orderId} not found` });
            }
            return Result.success(this.mapper.toPurchaseOrderDto(order));
        } catch (error: any) {
            return Result.failure({ code: 'QUERY_FAILED', message: error.message });
        }
    }
}
