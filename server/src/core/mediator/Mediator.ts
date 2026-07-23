import { IMediator } from './IMediator';
import { ICommandBus } from './commands/ICommandBus';
import { IQueryBus } from './queries/IQueryBus';
import { INotificationBus } from './notifications/INotificationBus';
import { ICommand } from './commands/ICommand';
import { IQuery } from './queries/IQuery';
import { INotification } from './notifications/INotification';

export class Mediator implements IMediator {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
    private readonly notificationBus: INotificationBus
  ) {}

  public async send<TResult>(command: ICommand<TResult>): Promise<TResult> {
    return this.commandBus.execute(command);
  }

  public async query<TResult>(query: IQuery<TResult>): Promise<TResult> {
    return this.queryBus.execute(query);
  }

  public async publish(notification: INotification): Promise<void> {
    return this.notificationBus.publish(notification);
  }
}
