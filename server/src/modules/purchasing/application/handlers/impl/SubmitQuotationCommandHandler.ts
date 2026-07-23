import { Result } from '../../../../../core/results/Result';
import { SubmitQuotationCommand } from '../../commands';
import { IRfqRepository, IQuotationRepository } from '../../../domain/repositories';
import { Quotation } from '../../../domain/entities';
import { RfqId, SupplierId, QuotationId } from '../../../domain/shared';
import { Money } from '../../../domain/value-objects';
import { randomUUID } from 'crypto';

export class SubmitQuotationCommandHandler {
    constructor(
        private readonly rfqRepository: IRfqRepository,
        private readonly quotationRepository: IQuotationRepository
    ) {}

    async handle(command: SubmitQuotationCommand): Promise<Result<string>> {
        try {
            const rfqId = new RfqId(command.rfqId);
            const rfq = await this.rfqRepository.findById(rfqId);
            if (!rfq) {
                return Result.failure({ code: 'RFQ_NOT_FOUND', message: `RFQ ${command.rfqId} not found` });
            }

            const id = new QuotationId(randomUUID());
            const quotation = new Quotation(
                id,
                rfqId,
                new SupplierId(command.supplierId),
                new Money(command.unitPrice),
                command.leadTimeDays,
                command.validUntil
            );
            
            await this.quotationRepository.save(quotation);
            return Result.success(id.value);
        } catch (error: any) {
            return Result.failure({ code: 'SUBMIT_QUOTATION_FAILED', message: error.message });
        }
    }
}
