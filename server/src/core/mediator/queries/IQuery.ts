export interface IQuery<TResult> {
  readonly type: string;
  readonly _resultType?: TResult;
}
