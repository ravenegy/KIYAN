import { IPipelineBehavior } from './IPipelineBehavior';
import { PipelineContext } from './PipelineContext';

export class PipelineExecutor<TRequest, TResponse> {
  private readonly behaviors: IPipelineBehavior<TRequest, TResponse>[];

  constructor(behaviors: IPipelineBehavior<TRequest, TResponse>[] = []) {
    this.behaviors = behaviors;
  }

  public async execute(
    request: TRequest,
    context: PipelineContext<TRequest>,
    handler: () => Promise<TResponse>
  ): Promise<TResponse> {
    const executeBehavior = async (index: number): Promise<TResponse> => {
      if (index >= this.behaviors.length) {
        return handler();
      }

      const behavior = this.behaviors[index];
      return behavior.handle(
        request,
        () => executeBehavior(index + 1),
        context
      );
    };

    return executeBehavior(0);
  }
}
