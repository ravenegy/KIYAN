import { IQueryHandler } from '../../../../core/mediator/queries/IQueryHandler';
import { GetBomsByTargetItemQuery } from '../queries/GetBomsByTargetItemQuery';
import { Result } from '../../../../core/results/Result';
import { BomSummaryDto } from '../dto/BomSummaryDto';

export interface IGetBomsByTargetItemQueryHandler extends IQueryHandler<GetBomsByTargetItemQuery, Result<BomSummaryDto[]>> {}
