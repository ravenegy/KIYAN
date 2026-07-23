import { CreateProductionOrderCommand } from '../../commands';
import { IProductionOrderRepository } from '../../../domain/repositories';
import { ResultFactory } from '../../../../../core/results/ResultFactory';
import { Result } from '../../../../../core/results/Result';
import { ProductionOrder } from '../../../domain/entities';
import { ProductionOrderId } from '../../../domain/shared/ProductionOrderId';
import { Quantity } from '../../../domain/value-objects/Quantity';
import { ProductionPriority } from '../../../domain/enums';

export class CreateProductionOrderCommandHandler {
    constructor(private readonly orderRepository: IProductionOrderRepository) {}

    public async handle(command: CreateProductionOrderCommand): Promise<Result<string>> {
        try {
            const idResult = ProductionOrderId.create(Date.now().toString());
            if (idResult.isFailure) return ResultFactory.failure(idResult.error!);
            const id = idResult.value!;

            const plannedQuantityResult = Quantity.create(command.plannedQuantity);
            
            if (plannedQuantityResult.isFailure) {
                return ResultFactory.failure(plannedQuantityResult.error!);
            }

            const startDate = new Date(command.startDate);
            const endDate = new Date(command.endDate);
            const priority = command.priority as ProductionPriority;

            const orderResult = ProductionOrder.create(
                id,
                command.targetItemId,
                plannedQuantityResult.value!,
                startDate,
                endDate,
                priority
            );

            if (orderResult.isFailure) {
                return ResultFactory.failure(orderResult.error!);
            }

            const order = orderResult.value!;
            
            await this.orderRepository.save(order);
            
            return ResultFactory.success(order.id.value);
        } catch (error: any) {
            return ResultFactory.failure({
                code: 'COMMAND_FAILED',
                message: error.message || 'An error occurred'
            });
        }
    }
}
