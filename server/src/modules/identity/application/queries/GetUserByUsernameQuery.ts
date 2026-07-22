import { IQuery } from '../../../../core';
import { Result } from '../../../../core';
import { UserDto } from '../dto';


export class GetUserByUsernameQuery implements IQuery<Result<UserDto>> {
  public readonly type: string = 'GetUserByUsernameQuery';
  public readonly _resultType?: Result<UserDto>;

  constructor(public readonly params: Readonly<{ username: string }>) {}
}
