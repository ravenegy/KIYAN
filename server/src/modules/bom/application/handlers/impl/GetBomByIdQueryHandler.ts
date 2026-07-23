import { BaseQueryHandler } from '../../../../../core/application/handlers/BaseQueryHandler';
import { GetBomByIdQuery } from '../../queries/GetBomByIdQuery';
import { Result } from '../../../../../core/results/Result';
import { BomDto } from '../../dto/BomDto';
import { IBomRepository } from '../../../domain/repositories/IBomRepository';
import { IBomMapper } from '../../mappers/IBomMapper';
import { BomId } from '../../../domain/shared/BomId';
import { BomNotFoundException } from '../../exceptions/BomNotFoundException';

export class GetBomByIdQueryHandler extends BaseQueryHandler<GetBomByIdQuery, BomDto> {
  constructor(
    private readonly bomRepository: IBomRepository,
    private readonly mapper: IBomMapper
  ) {
    super();
  }

  public async handle(query: GetBomByIdQuery): Promise<Result<BomDto>> {
    const bomId = BomId.create(query.bomId);
    const bom = await this.bomRepository.getById(bomId);
    if (!bom) {
      return Result.failure({ code: 'BOM_NOT_FOUND', message: new BomNotFoundException(query.bomId).message });
    }
    return Result.success(this.mapper.toDto(bom));
  }
}
