import { Result } from '../../results';
import { IQuery, IQueryHandler } from '../../mediator';

export abstract class BaseQueryHandler<TQuery extends IQuery<Result<TResponse>>, TResponse> 
  implements IQueryHandler<TQuery, Result<TResponse>> {
    abstract handle(query: TQuery): Promise<Result<TResponse>>;
}
