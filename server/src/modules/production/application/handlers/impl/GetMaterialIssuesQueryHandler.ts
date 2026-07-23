import { GetMaterialIssuesQuery } from '../../queries';
import { IProductionOrderRepository } from '../../../domain/repositories';
import { IProductionMapper } from '../../mappers/IProductionMapper';
import { MaterialIssueDto } from '../../dto';
import { ResultFactory } from '../../../../../core/results/ResultFactory';
import { Result } from '../../../../../core/results/Result';
import { ProductionOrderId } from '../../../domain/shared/ProductionOrderId';

export class GetMaterialIssuesQueryHandler {
    constructor(
        private readonly orderRepository: IProductionOrderRepository,
        private readonly mapper: IProductionMapper
    ) {}

    public async handle(query: GetMaterialIssuesQuery): Promise<Result<readonly MaterialIssueDto[]>> {
        try {
            const idResult = ProductionOrderId.create(query.orderId);
            if (idResult.isFailure) return ResultFactory.failure(idResult.error!);

            const order = await this.orderRepository.findById(idResult.value!);
            
            if (!order) {
                return ResultFactory.notFound(`Production order ${query.orderId} not found`);
            }

            let issues = order.materialIssues;

            if (query.status) {
                issues = issues.filter(issue => issue.status === query.status);
            }

            const dtos = issues.map(issue => this.mapper.toMaterialIssueDto(issue));
            return ResultFactory.success(dtos);
        } catch (error: any) {
            return ResultFactory.failure({
                code: 'QUERY_FAILED',
                message: error.message || 'An error occurred'
            });
        }
    }
}
