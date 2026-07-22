import { ICommand } from './commands/ICommand';
import { IQuery } from './queries/IQuery';
import { INotification } from './notifications/INotification';

export interface IMediator {
  send<TResult>(command: ICommand<TResult>): Promise<TResult>;
  query<TResult>(query: IQuery<TResult>): Promise<TResult>;
  publish(notification: INotification): Promise<void>;
}
