import { Result } from '../../../../core/results/Result';
import { IQueryHandler } from '../../../../core/mediator/queries/IQueryHandler';
import { GetUserPermissionsQuery } from '../queries/GetUserPermissionsQuery';


export interface IGetUserPermissionsQueryHandler extends IQueryHandler<GetUserPermissionsQuery, Result<string[]>> {}
