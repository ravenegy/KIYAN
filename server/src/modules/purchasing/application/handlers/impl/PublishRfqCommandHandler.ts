import { Result } from '../../../../../core/results/Result';
import { PublishRfqCommand } from '../../commands';
import { IRfqRepository } from '../../../domain/repositories';
import { RfqId } from '../../../domain/shared';

export class PublishRfqCommandHandler {
    constructor(private readonly rfqRepository: IRfqRepository) {}

    async handle(command: PublishRfqCommand): Promise<Result<void>> {
        try {
            const rfq = await this.rfqRepository.findById(new RfqId(command.rfqId));
            if (!rfq) {
                return Result.failure({ code: 'RFQ_NOT_FOUND', message: `RFQ ${command.rfqId} not found` });
            }

            rfq.publish();
            await this.rfqRepository.save(rfq);
            return Result.success();
        } catch (error: any) {
            return Result.failure({ code: 'PUBLISH_RFQ_FAILED', message: error.message });
        }
    }
}
