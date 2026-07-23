import { GetProductionOrdersQuery } from '../../queries';
import { IProductionOrderRepository } from '../../../domain/repositories';
import { IProductionMapper } from '../../mappers/IProductionMapper';
import { ProductionOrderDto } from '../../dto';
import { ResultFactory } from '../../../../../core/results/ResultFactory';
import { Result } from '../../../../../core/results/Result';

export class GetProductionOrdersQueryHandler {
    constructor(
        private readonly orderRepository: IProductionOrderRepository,
        private readonly mapper: IProductionMapper
    ) {}

    public async handle(query: GetProductionOrdersQuery): Promise<Result<readonly ProductionOrderDto[]>> {
        try {
            let orders = [];
            
            if (query.status) {
                orders = await this.orderRepository.findByStatus(query.status);
            } else if (query.itemId) {
                orders = await this.orderRepository.findByTargetItemId(query.itemId);
            } else {
                // If no filters are provided, and no findAll exists, we might need to handle it or return empty/error.
                // Assuming we want to support finding by status mainly as per repo interface.
                // We'll return an empty array if we can't fetch all, or we could extend the repo.
                // To keep it safe, if neither is provided, we return empty array for now since there's no findAll.
                orders = []; 
            }

            const dtos = orders.map(o => this.mapper.toProductionOrderDto(o));
            return ResultFactory.success(dtos);
        } catch (error: any) {
            return ResultFactory.failure({
                code: 'QUERY_FAILED',
                message: error.message || 'An error occurred while fetching production orders'
            });
        }
    }
}
