import { Result } from '../../../../../core/results/Result';
import { GetQuotationsByRfqIdQuery } from '../../queries';
import { QuotationDto } from '../../dto';
import { IQuotationRepository } from '../../../domain/repositories';
import { IPurchasingMapper } from '../../mappers';
import { RfqId } from '../../../domain/shared';

export class GetQuotationsByRfqIdQueryHandler {
    constructor(
        private readonly quotationRepository: IQuotationRepository,
        private readonly mapper: IPurchasingMapper
    ) {}

    async handle(query: GetQuotationsByRfqIdQuery): Promise<Result<readonly QuotationDto[]>> {
        try {
            const quotations = await this.quotationRepository.findByRfqId(new RfqId(query.rfqId));
            return Result.success(quotations.map(q => this.mapper.toQuotationDto(q)));
        } catch (error: any) {
            return Result.failure({ code: 'QUERY_FAILED', message: error.message });
        }
    }
}
