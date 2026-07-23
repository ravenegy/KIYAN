import { IQuery } from '../../../../core/mediator/queries/IQuery';
import { Result } from '../../../../core/results/Result';
import { PagedPermissionAssignmentDto } from '../dto/PagedPermissionAssignmentDto';

export class GetPermissionAssignmentsQuery implements IQuery<Result<PagedPermissionAssignmentDto>> {
  public readonly type: string = 'GetPermissionAssignmentsQuery';
  public readonly _resultType?: Result<PagedPermissionAssignmentDto>;

  constructor(public readonly params: Readonly<Record<string, any>>) {}
}
