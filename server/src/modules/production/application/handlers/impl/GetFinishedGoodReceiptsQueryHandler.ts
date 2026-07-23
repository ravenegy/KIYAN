import { GetFinishedGoodReceiptsQuery } from '../../queries';
import { IProductionOrderRepository } from '../../../domain/repositories';
import { IProductionMapper } from '../../mappers/IProductionMapper';
import { FinishedGoodReceiptDto } from '../../dto';
import { ResultFactory } from '../../../../../core/results/ResultFactory';
import { Result } from '../../../../../core/results/Result';
import { ProductionOrderId } from '../../../domain/shared/ProductionOrderId';

export class GetFinishedGoodReceiptsQueryHandler {
    constructor(
        private readonly orderRepository: IProductionOrderRepository,
        private readonly mapper: IProductionMapper
    ) {}

    public async handle(query: GetFinishedGoodReceiptsQuery): Promise<Result<readonly FinishedGoodReceiptDto[]>> {
        try {
            const idResult = ProductionOrderId.create(query.orderId);
            if (idResult.isFailure) return ResultFactory.failure(idResult.error!);

            const order = await this.orderRepository.findById(idResult.value!);
            
            if (!order) {
                return ResultFactory.notFound(`Production order ${query.orderId} not found`);
            }

            let receipts = order.receipts;

            if (query.status) {
                receipts = receipts.filter(receipt => receipt.status === query.status);
            }

            const dtos = receipts.map(receipt => this.mapper.toFinishedGoodReceiptDto(receipt));
            return ResultFactory.success(dtos);
        } catch (error: any) {
            return ResultFactory.failure({
                code: 'QUERY_FAILED',
                message: error.message || 'An error occurred'
            });
        }
    }
}
