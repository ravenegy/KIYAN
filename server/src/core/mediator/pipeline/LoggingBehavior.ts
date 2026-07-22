import { IPipelineBehavior } from './IPipelineBehavior';
import { PipelineContext } from './PipelineContext';

export class LoggingBehavior<TRequest, TResponse> implements IPipelineBehavior<TRequest, TResponse> {
  public async handle(
    request: TRequest,
    next: () => Promise<TResponse>,
    context: PipelineContext<TRequest>
  ): Promise<TResponse> {
    // Using string index signature check or constructor name to identify request type
    const requestObj = request as Record<string, unknown>;
    const requestType = typeof requestObj?.type === 'string' 
      ? requestObj.type 
      : (requestObj?.constructor?.name ?? 'UnknownRequest');
    
    // Execution start logging
    console.log(`[LoggingBehavior] Start execution: ${requestType}`);
    const startTime = Date.now();
    
    try {
      const response = await next();
      
      // Execution end logging
      const timeTaken = Date.now() - startTime;
      console.log(`[LoggingBehavior] Successfully executed: ${requestType} in ${timeTaken}ms`);
      
      return response;
    } catch (error) {
      const timeTaken = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`[LoggingBehavior] Failed to execute: ${requestType} in ${timeTaken}ms. Error: ${errorMessage}`);
      throw error;
    }
  }
}
