import { Result } from '../../../../../core/results/Result';
import { GetRfqByIdQuery } from '../../queries';
import { RequestForQuotationDto } from '../../dto';
import { IRfqRepository } from '../../../domain/repositories';
import { IPurchasingMapper } from '../../mappers';
import { RfqId } from '../../../domain/shared';

export class GetRfqByIdQueryHandler {
    constructor(
        private readonly rfqRepository: IRfqRepository,
        private readonly mapper: IPurchasingMapper
    ) {}

    async handle(query: GetRfqByIdQuery): Promise<Result<RequestForQuotationDto>> {
        try {
            const rfq = await this.rfqRepository.findById(new RfqId(query.rfqId));
            if (!rfq) {
                return Result.failure({ code: 'RFQ_NOT_FOUND', message: `RFQ ${query.rfqId} not found` });
            }
            return Result.success(this.mapper.toRfqDto(rfq));
        } catch (error: any) {
            return Result.failure({ code: 'QUERY_FAILED', message: error.message });
        }
    }
}
