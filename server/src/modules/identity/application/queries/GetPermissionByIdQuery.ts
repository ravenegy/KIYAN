import { IQuery } from '../../../../core';
import { Result } from '../../../../core';
import { PermissionDto } from '../dto';


export class GetPermissionByIdQuery implements IQuery<Result<PermissionDto>> {
  public readonly type: string = 'GetPermissionByIdQuery';
  public readonly _resultType?: Result<PermissionDto>;

  constructor(public readonly params: Readonly<{ id: string }>) {}
}
