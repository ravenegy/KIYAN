import { IssueMaterialCommand } from '../../commands';
import { IProductionOrderRepository } from '../../../domain/repositories';
import { ResultFactory } from '../../../../../core/results/ResultFactory';
import { Result } from '../../../../../core/results/Result';
import { ProductionOrderId } from '../../../domain/shared/ProductionOrderId';
import { Quantity } from '../../../domain/value-objects/Quantity';

export class IssueMaterialCommandHandler {
    constructor(private readonly orderRepository: IProductionOrderRepository) {}

    public async handle(command: IssueMaterialCommand): Promise<Result<void>> {
        try {
            const idResult = ProductionOrderId.create(command.orderId);
            if (idResult.isFailure) return ResultFactory.failure(idResult.error!);

            const order = await this.orderRepository.findById(idResult.value!);
            if (!order) return ResultFactory.notFound(`Production order ${command.orderId} not found`);

            const quantityResult = Quantity.create(command.quantity);
            
            if (quantityResult.isFailure) {
                return ResultFactory.failure(quantityResult.error!);
            }

            const issueResult = order.issueMaterial(command.materialIssueId, quantityResult.value!);
            
            if (issueResult.isFailure) {
                return issueResult;
            }

            await this.orderRepository.save(order);
            return ResultFactory.success();
        } catch (error: any) {
            return ResultFactory.failure({
                code: 'COMMAND_FAILED',
                message: error.message || 'An error occurred'
            });
        }
    }
}
