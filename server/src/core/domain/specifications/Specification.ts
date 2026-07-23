export abstract class Specification<T> {
  public abstract isSatisfiedBy(candidate: T): boolean;

  public and(other: Specification<T>): Specification<T> {
    return new AndSpecification<T>(this, other);
  }

  public or(other: Specification<T>): Specification<T> {
    return new OrSpecification<T>(this, other);
  }

  public not(): Specification<T> {
    return new NotSpecification<T>(this);
  }
}

export class AndSpecification<T> extends Specification<T> {
  constructor(private readonly left: Specification<T>, private readonly right: Specification<T>) {
    super();
  }

  public isSatisfiedBy(candidate: T): boolean {
    return this.left.isSatisfiedBy(candidate) && this.right.isSatisfiedBy(candidate);
  }
}

export class OrSpecification<T> extends Specification<T> {
  constructor(private readonly left: Specification<T>, private readonly right: Specification<T>) {
    super();
  }

  public isSatisfiedBy(candidate: T): boolean {
    return this.left.isSatisfiedBy(candidate) || this.right.isSatisfiedBy(candidate);
  }
}

export class NotSpecification<T> extends Specification<T> {
  constructor(private readonly spec: Specification<T>) {
    super();
  }

  public isSatisfiedBy(candidate: T): boolean {
    return !this.spec.isSatisfiedBy(candidate);
  }
}
