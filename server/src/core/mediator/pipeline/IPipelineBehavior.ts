import { PipelineContext } from './PipelineContext';

export interface IPipelineBehavior<TRequest, TResponse> {
  handle(
    request: TRequest,
    next: () => Promise<TResponse>,
    context: PipelineContext<TRequest>
  ): Promise<TResponse>;
}
