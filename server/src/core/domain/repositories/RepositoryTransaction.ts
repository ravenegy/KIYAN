export enum IsolationLevel {
  ReadUncommitted = 'ReadUncommitted',
  ReadCommitted = 'ReadCommitted',
  RepeatableRead = 'RepeatableRead',
  Serializable = 'Serializable'
}

export interface RepositoryTransaction {
  readonly transactionId: string;
  readonly isolationLevel: IsolationLevel;
  readonly startedAt: Date;
  readonly committedAt?: Date;
  readonly rolledBackAt?: Date;
}
