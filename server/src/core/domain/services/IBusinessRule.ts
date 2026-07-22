export interface IBusinessRule {
  readonly code: string;
  readonly message: string;
  readonly metadata?: Record<string, unknown>;
  isBroken(): boolean;
}
