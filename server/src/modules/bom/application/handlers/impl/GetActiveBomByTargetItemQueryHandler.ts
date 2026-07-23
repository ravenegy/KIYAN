import { BaseQueryHandler } from '../../../../../core/application/handlers/BaseQueryHandler';
import { GetActiveBomByTargetItemQuery } from '../../queries/GetActiveBomByTargetItemQuery';
import { Result } from '../../../../../core/results/Result';
import { BomDto } from '../../dto/BomDto';
import { IBomRepository } from '../../../domain/repositories/IBomRepository';
import { IBomMapper } from '../../mappers/IBomMapper';
import { ItemId } from '../../../domain/shared/ItemId';

export class GetActiveBomByTargetItemQueryHandler extends BaseQueryHandler<GetActiveBomByTargetItemQuery, BomDto> {
  constructor(
    private readonly bomRepository: IBomRepository,
    private readonly mapper: IBomMapper
  ) {
    super();
  }

  public async handle(query: GetActiveBomByTargetItemQuery): Promise<Result<BomDto>> {
    const targetItemId = ItemId.create(query.targetItemId);
    const bom = await this.bomRepository.getActiveBomForTarget(targetItemId);
    if (!bom) {
      return Result.failure({ code: 'ACTIVE_BOM_NOT_FOUND', message: `No active BOM found for item ${query.targetItemId}` });
    }
    return Result.success(this.mapper.toDto(bom));
  }
}
