import { ICommand } from './ICommand';
import { ICommandHandler } from './ICommandHandler';

export interface ICommandBus {
  register<TCommand extends ICommand<TResult>, TResult>(
    commandType: string,
    handler: ICommandHandler<TCommand, TResult>
  ): void;
  
  execute<TResult>(command: ICommand<TResult>): Promise<TResult>;
}
