import { IRequestContext } from './IRequestContext';

export interface IRequestContextAccessor {
  getCurrent(): IRequestContext | undefined;
  setCurrent(context: IRequestContext): void;
  clear(): void;
}

export class RequestContextAccessor implements IRequestContextAccessor {
  private currentContext?: IRequestContext;

  public getCurrent(): IRequestContext | undefined {
    return this.currentContext;
  }

  public setCurrent(context: IRequestContext): void {
    if (this.currentContext) {
      throw new Error('Request context is already set for this scope.');
    }
    this.currentContext = context;
  }

  public clear(): void {
    this.currentContext = undefined;
  }
}
