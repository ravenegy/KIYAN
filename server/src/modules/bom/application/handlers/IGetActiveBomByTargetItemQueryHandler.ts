import { IQueryHandler } from '../../../../core/mediator/queries/IQueryHandler';
import { GetActiveBomByTargetItemQuery } from '../queries/GetActiveBomByTargetItemQuery';
import { Result } from '../../../../core/results/Result';
import { BomDto } from '../dto/BomDto';

export interface IGetActiveBomByTargetItemQueryHandler extends IQueryHandler<GetActiveBomByTargetItemQuery, Result<BomDto>> {}
