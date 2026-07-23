import { IQuery } from '../../../../core/mediator/queries/IQuery';
import { Result } from '../../../../core/results/Result';
import { PagedRoleAssignmentDto } from '../dto/PagedRoleAssignmentDto';

export class GetRoleAssignmentsQuery implements IQuery<Result<PagedRoleAssignmentDto>> {
  public readonly type: string = 'GetRoleAssignmentsQuery';
  public readonly _resultType?: Result<PagedRoleAssignmentDto>;

  constructor(public readonly params: Readonly<Record<string, any>>) {}
}
