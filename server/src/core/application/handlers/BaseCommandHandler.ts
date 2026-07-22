import { Result } from '../../results';
import { ICommand, ICommandHandler } from '../../mediator';

export abstract class BaseCommandHandler<TCommand extends ICommand<Result<TResponse>>, TResponse> 
  implements ICommandHandler<TCommand, Result<TResponse>> {
    abstract handle(command: TCommand): Promise<Result<TResponse>>;
}
