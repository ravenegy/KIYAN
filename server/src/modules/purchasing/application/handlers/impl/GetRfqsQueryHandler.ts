import { Result } from '../../../../../core/results/Result';
import { GetRfqsQuery } from '../../queries';
import { RequestForQuotationDto } from '../../dto';
import { IRfqRepository } from '../../../domain/repositories';
import { IPurchasingMapper } from '../../mappers';

export class GetRfqsQueryHandler {
    constructor(
        private readonly rfqRepository: IRfqRepository,
        private readonly mapper: IPurchasingMapper
    ) {}

    async handle(query: GetRfqsQuery): Promise<Result<readonly RequestForQuotationDto[]>> {
        try {
            let rfqs = await this.rfqRepository.findAll();
            if (query.status) {
                rfqs = rfqs.filter(r => r.status === query.status);
            }
            return Result.success(rfqs.map(r => this.mapper.toRfqDto(r)));
        } catch (error: any) {
            return Result.failure({ code: 'QUERY_FAILED', message: error.message });
        }
    }
}
