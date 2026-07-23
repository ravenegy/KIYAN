import { CancelProductionOrderCommand } from '../../commands';
import { IProductionOrderRepository } from '../../../domain/repositories';
import { ResultFactory } from '../../../../../core/results/ResultFactory';
import { Result } from '../../../../../core/results/Result';
import { ProductionOrderId } from '../../../domain/shared/ProductionOrderId';

export class CancelProductionOrderCommandHandler {
    constructor(private readonly orderRepository: IProductionOrderRepository) {}

    public async handle(command: CancelProductionOrderCommand): Promise<Result<void>> {
        try {
            const idResult = ProductionOrderId.create(command.orderId);
            if (idResult.isFailure) return ResultFactory.failure(idResult.error!);

            const order = await this.orderRepository.findById(idResult.value!);
            if (!order) return ResultFactory.notFound(`Production order ${command.orderId} not found`);

            const cancelResult = order.cancel(command.reason || 'No reason provided');
            if (cancelResult.isFailure) {
                return cancelResult;
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
