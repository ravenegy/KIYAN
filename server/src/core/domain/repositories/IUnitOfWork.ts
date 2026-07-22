import { RepositoryTransaction, IsolationLevel } from './RepositoryTransaction';

export interface IUnitOfWork {
  readonly isActive: boolean;
  begin(isolationLevel?: IsolationLevel): Promise<RepositoryTransaction>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  dispose(): Promise<void>;
  execute<T>(operation: () => Promise<T>, isolationLevel?: IsolationLevel): Promise<T>;
}
