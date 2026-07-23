import { IQueryHandler } from '../../../../core/mediator/queries/IQueryHandler';
import { GetBomByIdQuery } from '../queries/GetBomByIdQuery';
import { Result } from '../../../../core/results/Result';
import { BomDto } from '../dto/BomDto';

export interface IGetBomByIdQueryHandler extends IQueryHandler<GetBomByIdQuery, Result<BomDto>> {}
