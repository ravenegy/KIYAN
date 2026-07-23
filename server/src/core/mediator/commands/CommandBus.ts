import { ICommandBus } from './ICommandBus';
import { ICommand } from './ICommand';
import { ICommandHandler } from './ICommandHandler';

export class CommandBus implements ICommandBus {
  private readonly handlers = new Map<string, ICommandHandler<any, any>>();

  public register<TCommand extends ICommand<TResult>, TResult>(
    commandType: string,
    handler: ICommandHandler<TCommand, TResult>
  ): void {
    if (this.handlers.has(commandType)) {
      throw new Error(`Command handler for '${commandType}' is already registered.`);
    }
    this.handlers.set(commandType, handler);
  }

  public async execute<TResult>(command: ICommand<TResult>): Promise<TResult> {
    const handler = this.handlers.get(command.type);
    if (!handler) {
      throw new Error(`No command handler registered for '${command.type}'.`);
    }
    return handler.handle(command);
  }
}
