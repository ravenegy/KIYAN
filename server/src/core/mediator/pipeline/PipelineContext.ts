import { IContainer } from '../../di/IContainer';

export interface PipelineContext<TRequest> {
  readonly request: TRequest;
  readonly serviceProvider: IContainer;
  readonly metadata: Record<string, unknown>;
}
