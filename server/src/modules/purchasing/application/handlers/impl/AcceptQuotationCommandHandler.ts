import { Result } from '../../../../../core/results/Result';
import { AcceptQuotationCommand } from '../../commands';
import { IQuotationRepository } from '../../../domain/repositories';
import { QuotationId } from '../../../domain/shared';

export class AcceptQuotationCommandHandler {
    constructor(private readonly quotationRepository: IQuotationRepository) {}

    async handle(command: AcceptQuotationCommand): Promise<Result<void>> {
        try {
            const quotation = await this.quotationRepository.findById(new QuotationId(command.quotationId));
            if (!quotation) {
                return Result.failure({ code: 'QUOTATION_NOT_FOUND', message: `Quotation ${command.quotationId} not found` });
            }

            quotation.accept();
            await this.quotationRepository.save(quotation);
            return Result.success();
        } catch (error: any) {
            return Result.failure({ code: 'ACCEPT_QUOTATION_FAILED', message: error.message });
        }
    }
}
