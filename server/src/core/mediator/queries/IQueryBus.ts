import { IQuery } from './IQuery';
import { IQueryHandler } from './IQueryHandler';

export interface IQueryBus {
  register<TQuery extends IQuery<TResult>, TResult>(
    queryType: string,
    handler: IQueryHandler<TQuery, TResult>
  ): void;
  
  execute<TResult>(query: IQuery<TResult>): Promise<TResult>;
}
