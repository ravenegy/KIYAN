import { Result } from '../../../../../core/results/Result';
import { CreateRfqCommand } from '../../commands';
import { IRfqRepository } from '../../../domain/repositories';
import { RequestForQuotation } from '../../../domain/entities';
import { RfqId } from '../../../domain/shared';
import { Quantity } from '../../../domain/value-objects';
import { randomUUID } from 'crypto';

export class CreateRfqCommandHandler {
    constructor(private readonly rfqRepository: IRfqRepository) {}

    async handle(command: CreateRfqCommand): Promise<Result<string>> {
        try {
            const id = new RfqId(randomUUID());
            const rfq = new RequestForQuotation(
                id, 
                command.itemId, 
                new Quantity(command.requiredQuantity), 
                command.requiredByDate
            );
            await this.rfqRepository.save(rfq);
            return Result.success(id.value);
        } catch (error: any) {
            return Result.failure({ code: 'CREATE_RFQ_FAILED', message: error.message });
        }
    }
}
