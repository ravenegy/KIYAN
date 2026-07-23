import { IBusinessRule } from './IBusinessRule';

export abstract class BusinessRule implements IBusinessRule {
  public abstract readonly code: string;
  public abstract readonly message: string;
  public readonly metadata?: Record<string, unknown>;

  protected constructor(metadata?: Record<string, unknown>) {
    this.metadata = metadata ? Object.freeze({ ...metadata }) : undefined;
  }

  public abstract isBroken(): boolean;
}
