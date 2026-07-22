import { z } from "zod";

export interface IConfiguration<T> {
  readonly current: T;
  get<K extends keyof T>(key: K): T[K];
}

export class Configuration<T> implements IConfiguration<T> {
  public readonly current: T;

  constructor(schema: z.ZodType<T>, source: unknown) {
    const result = schema.safeParse(source);
    
    if (!result.success) {
      const errorMessages = result.error.issues
        .map((e: z.ZodIssue) => `${e.path.join('.')}: ${e.message}`)
        .join(', ');
      throw new Error(`Configuration validation failed: ${errorMessages}`);
    }
    
    // Deep freeze the configuration to make it immutable
    this.current = this.deepFreeze(result.data);
  }

  public get<K extends keyof T>(key: K): T[K] {
    return this.current[key];
  }

  private deepFreeze<U>(obj: U): U {
    if (obj && typeof obj === 'object') {
      Object.keys(obj as object).forEach(prop => {
        const propValue = (obj as Record<string, unknown>)[prop];
        if (propValue && typeof propValue === 'object') {
          this.deepFreeze(propValue);
        }
      });
      return Object.freeze(obj);
    }
    return obj;
  }
}
