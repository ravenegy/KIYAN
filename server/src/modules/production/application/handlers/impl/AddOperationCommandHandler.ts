import { AddOperationCommand } from '../../commands';
import { IProductionOrderRepository } from '../../../domain/repositories';
import { ResultFactory } from '../../../../../core/results/ResultFactory';
import { Result } from '../../../../../core/results/Result';
import { ProductionOperation } from '../../../domain/entities';
import { ProductionOrderId } from '../../../domain/shared/ProductionOrderId';
import { OperationId } from '../../../domain/shared/OperationId';
import { WorkCenterId } from '../../../domain/shared/WorkCenterId';
import { ProductionDuration } from '../../../domain/value-objects/ProductionDuration';

export class AddOperationCommandHandler {
    constructor(private readonly orderRepository: IProductionOrderRepository) {}

    public async handle(command: AddOperationCommand): Promise<Result<string>> {
        try {
            const idResult = ProductionOrderId.create(command.orderId);
            if (idResult.isFailure) return ResultFactory.failure(idResult.error!);

            const order = await this.orderRepository.findById(idResult.value!);
            if (!order) return ResultFactory.notFound(`Production order ${command.orderId} not found`);

            const opIdResult = OperationId.create(Date.now().toString());
            if (opIdResult.isFailure) return ResultFactory.failure(opIdResult.error!);
            const id = opIdResult.value!;
            
            const workCenterIdResult = WorkCenterId.create(command.workCenterId);
            if (workCenterIdResult.isFailure) return ResultFactory.failure(workCenterIdResult.error!);
            
            const setupResult = ProductionDuration.create(command.setupTimeMinutes);
            if (setupResult.isFailure) return ResultFactory.failure(setupResult.error!);
            
            const runResult = ProductionDuration.create(command.runTimeMinutes);
            if (runResult.isFailure) return ResultFactory.failure(runResult.error!);

            const operationResult = ProductionOperation.create(
                id,
                command.sequence,
                command.name,
                workCenterIdResult.value!,
                setupResult.value!,
                runResult.value!
            );

            if (operationResult.isFailure) {
                return ResultFactory.failure(operationResult.error!);
            }

            const addResult = order.addOperation(operationResult.value!);
            if (addResult.isFailure) {
                return ResultFactory.failure(addResult.error!);
            }

            await this.orderRepository.save(order);
            return ResultFactory.success(id.value);
        } catch (error: any) {
            return ResultFactory.failure({
                code: 'COMMAND_FAILED',
                message: error.message || 'An error occurred'
            });
        }
    }
}
