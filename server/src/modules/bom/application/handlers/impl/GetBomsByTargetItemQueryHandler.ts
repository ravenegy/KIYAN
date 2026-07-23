import { BaseQueryHandler } from '../../../../../core/application/handlers/BaseQueryHandler';
import { GetBomsByTargetItemQuery } from '../../queries/GetBomsByTargetItemQuery';
import { Result } from '../../../../../core/results/Result';
import { BomSummaryDto } from '../../dto/BomSummaryDto';
import { IBomRepository } from '../../../domain/repositories/IBomRepository';
import { IBomMapper } from '../../mappers/IBomMapper';
import { ItemId } from '../../../domain/shared/ItemId';

export class GetBomsByTargetItemQueryHandler extends BaseQueryHandler<GetBomsByTargetItemQuery, BomSummaryDto[]> {
  constructor(
    private readonly bomRepository: IBomRepository,
    private readonly mapper: IBomMapper
  ) {
    super();
  }

  public async handle(query: GetBomsByTargetItemQuery): Promise<Result<BomSummaryDto[]>> {
    const targetItemId = ItemId.create(query.targetItemId);
    const boms = await this.bomRepository.findByTargetItemId(targetItemId);
    const summaries = boms.map(bom => this.mapper.toSummaryDto(bom));
    return Result.success(summaries);
  }
}
