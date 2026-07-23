import { IQuery } from '../../../../core/mediator/queries/IQuery';
import { Result } from '../../../../core/results/Result';
import { RoleHierarchyDto } from '../dto/RoleHierarchyDto';

export class GetRoleHierarchyQuery implements IQuery<Result<RoleHierarchyDto[]>> {
  public readonly type: string = 'GetRoleHierarchyQuery';
  public readonly _resultType?: Result<RoleHierarchyDto[]>;

  constructor(public readonly params: Readonly<Record<string, any>>) {}
}
