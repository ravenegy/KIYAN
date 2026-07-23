export interface IRequest<TBody = unknown, TQuery = unknown, TParams = unknown> {
  readonly body: TBody;
  readonly query: TQuery;
  readonly params: TParams;
}
