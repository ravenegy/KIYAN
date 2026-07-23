import { IQuery } from '../../../../core';
import { Result } from '../../../../core';
import { RoleDto } from '../dto';


export class GetRoleByIdQuery implements IQuery<Result<RoleDto>> {
  public readonly type: string = 'GetRoleByIdQuery';
  public readonly _resultType?: Result<RoleDto>;

  constructor(public readonly params: Readonly<{ id: string }>) {}
}
