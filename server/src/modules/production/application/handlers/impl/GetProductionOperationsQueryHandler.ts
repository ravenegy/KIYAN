import { GetProductionOperationsQuery } from '../../queries';
import { IProductionOrderRepository } from '../../../domain/repositories';
import { IProductionMapper } from '../../mappers/IProductionMapper';
import { ProductionOperationDto } from '../../dto';
import { ResultFactory } from '../../../../../core/results/ResultFactory';
import { Result } from '../../../../../core/results/Result';
import { ProductionOrderId } from '../../../domain/shared/ProductionOrderId';

export class GetProductionOperationsQueryHandler {
    constructor(
        private readonly orderRepository: IProductionOrderRepository,
        private readonly mapper: IProductionMapper
    ) {}

    public async handle(query: GetProductionOperationsQuery): Promise<Result<readonly ProductionOperationDto[]>> {
        try {
            const idResult = ProductionOrderId.create(query.orderId);
            if (idResult.isFailure) return ResultFactory.failure(idResult.error!);

            const order = await this.orderRepository.findById(idResult.value!);
            
            if (!order) {
                return ResultFactory.notFound(`Production order ${query.orderId} not found`);
            }

            let operations = order.operations;

            if (query.workCenterId) {
                operations = operations.filter(op => op.workCenterId.value === query.workCenterId);
            }
            if (query.status) {
                operations = operations.filter(op => op.status === query.status);
            }

            const dtos = operations.map(op => this.mapper.toProductionOperationDto(op));
            return ResultFactory.success(dtos);
        } catch (error: any) {
            return ResultFactory.failure({
                code: 'QUERY_FAILED',
                message: error.message || 'An error occurred'
            });
        }
    }
}
