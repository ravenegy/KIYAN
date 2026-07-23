import { ReceiveFinishedGoodsCommand } from '../../commands';
import { IProductionOrderRepository } from '../../../domain/repositories';
import { ResultFactory } from '../../../../../core/results/ResultFactory';
import { Result } from '../../../../../core/results/Result';
import { FinishedGoodReceipt } from '../../../domain/entities';
import { ProductionOrderId } from '../../../domain/shared/ProductionOrderId';
import { FinishedGoodReceiptId } from '../../../domain/shared/FinishedGoodReceiptId';
import { Quantity } from '../../../domain/value-objects/Quantity';

export class ReceiveFinishedGoodsCommandHandler {
    constructor(private readonly orderRepository: IProductionOrderRepository) {}

    public async handle(command: ReceiveFinishedGoodsCommand): Promise<Result<string>> {
        try {
            const idResult = ProductionOrderId.create(command.orderId);
            if (idResult.isFailure) return ResultFactory.failure(idResult.error!);

            const order = await this.orderRepository.findById(idResult.value!);
            if (!order) return ResultFactory.notFound(`Production order ${command.orderId} not found`);

            const quantityResult = Quantity.create(command.quantity);
            
            if (quantityResult.isFailure) {
                return ResultFactory.failure(quantityResult.error!);
            }

            const receiptIdResult = FinishedGoodReceiptId.create(Date.now().toString());
            if (receiptIdResult.isFailure) return ResultFactory.failure(receiptIdResult.error!);
            const receiptId = receiptIdResult.value!;

            const receiptResult = FinishedGoodReceipt.create(
                receiptId,
                command.itemId,
                quantityResult.value!
            );

            if (receiptResult.isFailure) {
                return ResultFactory.failure(receiptResult.error!);
            }

            const receiveResult = order.receiveFinishedGoods(receiptResult.value!);
            
            if (receiveResult.isFailure) {
                return ResultFactory.failure(receiveResult.error!);
            }

            await this.orderRepository.save(order);
            return ResultFactory.success(receiptId.value);
        } catch (error: any) {
            return ResultFactory.failure({
                code: 'COMMAND_FAILED',
                message: error.message || 'An error occurred'
            });
        }
    }
}
