import { IQuery } from '../../../../core/mediator/queries/IQuery';
import { Result } from '../../../../core/results/Result';


export class GetUserPermissionsQuery implements IQuery<Result<string[]>> {
  public readonly type: string = 'GetUserPermissionsQuery';
  public readonly _resultType?: Result<string[]>;

  constructor(public readonly params: Readonly<Record<string, any>>) {}
}
