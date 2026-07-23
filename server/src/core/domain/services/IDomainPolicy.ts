export interface IDomainPolicy<TContext> {
  isApplicable(context: TContext): boolean;
  evaluate(context: TContext): boolean;
}
