import { IQueryBus } from './IQueryBus';
import { IQuery } from './IQuery';
import { IQueryHandler } from './IQueryHandler';

export class QueryBus implements IQueryBus {
  private readonly handlers = new Map<string, IQueryHandler<any, any>>();

  public register<TQuery extends IQuery<TResult>, TResult>(
    queryType: string,
    handler: IQueryHandler<TQuery, TResult>
  ): void {
    if (this.handlers.has(queryType)) {
      throw new Error(`Query handler for '${queryType}' is already registered.`);
    }
    this.handlers.set(queryType, handler);
  }

  public async execute<TResult>(query: IQuery<TResult>): Promise<TResult> {
    const handler = this.handlers.get(query.type);
    if (!handler) {
      throw new Error(`No query handler registered for '${query.type}'.`);
    }
    return handler.handle(query);
  }
}
