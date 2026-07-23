import { AddMaterialIssueCommand } from '../../commands';
import { IProductionOrderRepository } from '../../../domain/repositories';
import { ResultFactory } from '../../../../../core/results/ResultFactory';
import { Result } from '../../../../../core/results/Result';
import { ProductionMaterialIssue } from '../../../domain/entities';
import { ProductionOrderId } from '../../../domain/shared/ProductionOrderId';
import { MaterialIssueId } from '../../../domain/shared/MaterialIssueId';
import { Quantity } from '../../../domain/value-objects/Quantity';

export class AddMaterialIssueCommandHandler {
    constructor(private readonly orderRepository: IProductionOrderRepository) {}

    public async handle(command: AddMaterialIssueCommand): Promise<Result<string>> {
        try {
            const idResult = ProductionOrderId.create(command.orderId);
            if (idResult.isFailure) return ResultFactory.failure(idResult.error!);

            const order = await this.orderRepository.findById(idResult.value!);
            if (!order) return ResultFactory.notFound(`Production order ${command.orderId} not found`);

            const issueIdResult = MaterialIssueId.create(Date.now().toString());
            if (issueIdResult.isFailure) return ResultFactory.failure(issueIdResult.error!);
            const id = issueIdResult.value!;
            
            const quantityResult = Quantity.create(command.requiredQuantity);
            
            if (quantityResult.isFailure) {
                return ResultFactory.failure(quantityResult.error!);
            }

            const issueResult = ProductionMaterialIssue.create(
                id,
                command.itemId,
                quantityResult.value!
            );

            if (issueResult.isFailure) {
                return ResultFactory.failure(issueResult.error!);
            }

            const addResult = order.addMaterialIssueRequirement(issueResult.value!);
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
