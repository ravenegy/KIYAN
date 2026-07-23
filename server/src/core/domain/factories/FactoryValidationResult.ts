export class FactoryValidationResult {
  public readonly isSuccess: boolean;
  public readonly errors: ReadonlyArray<string>;
  public readonly warnings: ReadonlyArray<string>;

  constructor(isSuccess: boolean, errors: string[] = [], warnings: string[] = []) {
    this.isSuccess = isSuccess;
    this.errors = Object.freeze([...errors]);
    this.warnings = Object.freeze([...warnings]);
    Object.freeze(this);
  }

  public static success(warnings: string[] = []): FactoryValidationResult {
    return new FactoryValidationResult(true, [], warnings);
  }

  public static failure(errors: string[], warnings: string[] = []): FactoryValidationResult {
    return new FactoryValidationResult(false, errors, warnings);
  }
}
