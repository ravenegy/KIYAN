import { IQuery } from '../../../../core/mediator/queries/IQuery';
import { Result } from '../../../../core/results/Result';
import { PagedPermissionGroupDto } from '../dto/PagedPermissionGroupDto';

export class GetPermissionGroupsQuery implements IQuery<Result<PagedPermissionGroupDto>> {
  public readonly type: string = 'GetPermissionGroupsQuery';
  public readonly _resultType?: Result<PagedPermissionGroupDto>;

  constructor(public readonly params: Readonly<Record<string, any>>) {}
}
