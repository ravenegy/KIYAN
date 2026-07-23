import { IDomainPolicy } from './IDomainPolicy';

export abstract class DomainPolicy<TContext> implements IDomainPolicy<TContext> {
  public abstract isApplicable(context: TContext): boolean;
  public abstract evaluate(context: TContext): boolean;

  public and(other: IDomainPolicy<TContext>): IDomainPolicy<TContext> {
    return new AndPolicy<TContext>(this, other);
  }

  public or(other: IDomainPolicy<TContext>): IDomainPolicy<TContext> {
    return new OrPolicy<TContext>(this, other);
  }

  public not(): IDomainPolicy<TContext> {
    return new NotPolicy<TContext>(this);
  }
}

class AndPolicy<TContext> extends DomainPolicy<TContext> {
  constructor(private readonly left: IDomainPolicy<TContext>, private readonly right: IDomainPolicy<TContext>) {
    super();
  }

  public isApplicable(context: TContext): boolean {
    return this.left.isApplicable(context) && this.right.isApplicable(context);
  }

  public evaluate(context: TContext): boolean {
    return this.left.evaluate(context) && this.right.evaluate(context);
  }
}

class OrPolicy<TContext> extends DomainPolicy<TContext> {
  constructor(private readonly left: IDomainPolicy<TContext>, private readonly right: IDomainPolicy<TContext>) {
    super();
  }

  public isApplicable(context: TContext): boolean {
    return this.left.isApplicable(context) || this.right.isApplicable(context);
  }

  public evaluate(context: TContext): boolean {
    return this.left.evaluate(context) || this.right.evaluate(context);
  }
}

class NotPolicy<TContext> extends DomainPolicy<TContext> {
  constructor(private readonly policy: IDomainPolicy<TContext>) {
    super();
  }

  public isApplicable(context: TContext): boolean {
    return this.policy.isApplicable(context);
  }

  public evaluate(context: TContext): boolean {
    return !this.policy.evaluate(context);
  }
}
