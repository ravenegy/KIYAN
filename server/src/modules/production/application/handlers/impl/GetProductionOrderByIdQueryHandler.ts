import { GetProductionOrderByIdQuery } from '../../queries';
import { IProductionOrderRepository } from '../../../domain/repositories';
import { IProductionMapper } from '../../mappers/IProductionMapper';
import { ProductionOrderDto } from '../../dto';
import { ResultFactory } from '../../../../../core/results/ResultFactory';
import { Result } from '../../../../../core/results/Result';
import { ProductionOrderId } from '../../../domain/shared/ProductionOrderId';

export class GetProductionOrderByIdQueryHandler {
    constructor(
        private readonly orderRepository: IProductionOrderRepository,
        private readonly mapper: IProductionMapper
    ) {}

    public async handle(query: GetProductionOrderByIdQuery): Promise<Result<ProductionOrderDto>> {
        try {
            const idResult = ProductionOrderId.create(query.orderId);
            if (idResult.isFailure) return ResultFactory.failure(idResult.error!);

            const order = await this.orderRepository.findById(idResult.value!);
            
            if (!order) {
                return ResultFactory.notFound(`Production order ${query.orderId} not found`);
            }

            return ResultFactory.success(this.mapper.toProductionOrderDto(order));
        } catch (error: any) {
            return ResultFactory.failure({
                code: 'QUERY_FAILED',
                message: error.message || 'An error occurred'
            });
        }
    }
}
