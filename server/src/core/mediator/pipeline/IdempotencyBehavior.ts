import { IPipelineBehavior } from './IPipelineBehavior';
import { PipelineContext } from './PipelineContext';

export class IdempotencyBehavior<TRequest, TResponse> implements IPipelineBehavior<TRequest, TResponse> {
  public async handle(
    request: TRequest,
    next: () => Promise<TResponse>,
    context: PipelineContext<TRequest>
  ): Promise<TResponse> {
    // Infrastructure placeholder for idempotency logic (commands only)
    return next();
  }
}
