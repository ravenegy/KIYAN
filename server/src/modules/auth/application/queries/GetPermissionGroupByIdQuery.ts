import { IQuery } from '../../../../core/mediator/queries/IQuery';
import { Result } from '../../../../core/results/Result';
import { PermissionGroupDto } from '../dto/PermissionGroupDto';

export class GetPermissionGroupByIdQuery implements IQuery<Result<PermissionGroupDto>> {
  public readonly type: string = 'GetPermissionGroupByIdQuery';
  public readonly _resultType?: Result<PermissionGroupDto>;

  constructor(public readonly params: Readonly<Record<string, any>>) {}
}
