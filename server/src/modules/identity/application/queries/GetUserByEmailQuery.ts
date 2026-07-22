import { IQuery } from '../../../../core';
import { Result } from '../../../../core';
import { UserDto } from '../dto';


export class GetUserByEmailQuery implements IQuery<Result<UserDto>> {
  public readonly type: string = 'GetUserByEmailQuery';
  public readonly _resultType?: Result<UserDto>;

  constructor(public readonly params: Readonly<{ email: string }>) {}
}
