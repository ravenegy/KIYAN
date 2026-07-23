import { IPipelineBehavior } from './IPipelineBehavior';
import { PipelineContext } from './PipelineContext';

export class TransactionBehavior<TRequest, TResponse> implements IPipelineBehavior<TRequest, TResponse> {
  public async handle(
    request: TRequest,
    next: () => Promise<TResponse>,
    context: PipelineContext<TRequest>
  ): Promise<TResponse> {
    // Infrastructure placeholder for transaction logic (commands only)
    return next();
  }
}
