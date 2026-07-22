export interface ICommand<TResult> {
  readonly id: string;
  readonly type: string;
  readonly timestamp: Date;
  readonly _resultType?: TResult;
}
