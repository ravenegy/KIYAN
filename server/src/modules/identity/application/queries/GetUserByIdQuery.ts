import { IQuery } from '../../../../core';
import { Result } from '../../../../core';
import { UserDto } from '../dto';


export class GetUserByIdQuery implements IQuery<Result<UserDto>> {
  public readonly type: string = 'GetUserByIdQuery';
  public readonly _resultType?: Result<UserDto>;

  constructor(public readonly params: Readonly<{ id: string }>) {}
}
