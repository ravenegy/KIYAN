import { UpdateOperationStatusCommand } from '../../commands';
import { IProductionOrderRepository } from '../../../domain/repositories';
import { ResultFactory } from '../../../../../core/results/ResultFactory';
import { Result } from '../../../../../core/results/Result';
import { ProductionOrderId } from '../../../domain/shared/ProductionOrderId';
import { OperationStatus } from '../../../domain/enums';

export class UpdateOperationStatusCommandHandler {
    constructor(private readonly orderRepository: IProductionOrderRepository) {}

    public async handle(command: UpdateOperationStatusCommand): Promise<Result<void>> {
        try {
            const idResult = ProductionOrderId.create(command.orderId);
            if (idResult.isFailure) return ResultFactory.failure(idResult.error!);

            const order = await this.orderRepository.findById(idResult.value!);
            if (!order) return ResultFactory.notFound(`Production order ${command.orderId} not found`);

            const operation = order.operations.find(op => op.id.value === command.operationId);
            
            if (!operation) {
                return ResultFactory.notFound(`Operation ${command.operationId} not found on order ${command.orderId}`);
            }

            let statusResult: Result<void>;
            
            if (command.status === OperationStatus.Ready) {
                statusResult = operation.markAsReady();
            } else if (command.status === OperationStatus.InProgress) {
                statusResult = operation.start();
            } else if (command.status === OperationStatus.Completed) {
                statusResult = operation.complete();
            } else {
                return ResultFactory.validation(`Invalid status update to ${command.status}`);
            }

            if (statusResult.isFailure) {
                return statusResult;
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
