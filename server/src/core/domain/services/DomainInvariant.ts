import { InvariantViolation } from './InvariantViolation';

export class DomainInvariant {
  public static require(condition: boolean, message: string): void {
    if (!condition) {
      throw new InvariantViolation(message);
    }
  }

  public static notNull<T>(value: T | null | undefined, name: string): void {
    if (value === null || value === undefined) {
      throw new InvariantViolation(`${name} cannot be null or undefined`);
    }
  }

  public static notEmpty(value: string | null | undefined, name: string): void {
    this.notNull(value, name);
    if (value!.trim() === '') {
      throw new InvariantViolation(`${name} cannot be empty`);
    }
  }

  public static greaterThan(value: number, threshold: number, name: string): void {
    if (value <= threshold) {
      throw new InvariantViolation(`${name} must be greater than ${threshold}`);
    }
  }

  public static lessThan(value: number, threshold: number, name: string): void {
    if (value >= threshold) {
      throw new InvariantViolation(`${name} must be less than ${threshold}`);
    }
  }

  public static between(value: number, min: number, max: number, name: string): void {
    if (value < min || value > max) {
      throw new InvariantViolation(`${name} must be between ${min} and ${max}`);
    }
  }

  public static matches(value: string, pattern: RegExp, name: string): void {
    if (!pattern.test(value)) {
      throw new InvariantViolation(`${name} does not match the required pattern`);
    }
  }

  public static custom<T>(value: T, predicate: (v: T) => boolean, message: string): void {
    if (!predicate(value)) {
      throw new InvariantViolation(message);
    }
  }
}
