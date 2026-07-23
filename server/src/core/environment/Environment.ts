export interface IEnvironment {
  get(key: string): string | undefined;
  getRequired(key: string): string;
  getBoolean(key: string, defaultValue?: boolean): boolean;
  getNumber(key: string, defaultValue?: number): number;
  getString(key: string, defaultValue?: string): string;
}

export class Environment implements IEnvironment {
  private readonly env: NodeJS.ProcessEnv;

  constructor(env: NodeJS.ProcessEnv = process.env) {
    this.env = env;
  }

  public get(key: string): string | undefined {
    return this.env[key];
  }

  public getRequired(key: string): string {
    const value = this.get(key);
    if (value === undefined || value.trim() === '') {
      throw new Error(`Environment variable ${key} is required but missing or empty.`);
    }
    return value;
  }

  public getBoolean(key: string, defaultValue?: boolean): boolean {
    const value = this.get(key);
    if (value === undefined) {
      if (defaultValue !== undefined) return defaultValue;
      throw new Error(`Environment variable ${key} is missing and no default value provided.`);
    }
    
    const lowerValue = value.trim().toLowerCase();
    if (lowerValue === 'true' || lowerValue === '1' || lowerValue === 'yes') return true;
    if (lowerValue === 'false' || lowerValue === '0' || lowerValue === 'no') return false;
    
    throw new Error(`Environment variable ${key} has an invalid boolean value: ${value}`);
  }

  public getNumber(key: string, defaultValue?: number): number {
    const value = this.get(key);
    if (value === undefined) {
      if (defaultValue !== undefined) return defaultValue;
      throw new Error(`Environment variable ${key} is missing and no default value provided.`);
    }
    
    const num = Number(value);
    if (Number.isNaN(num)) {
      throw new Error(`Environment variable ${key} has an invalid number value: ${value}`);
    }
    
    return num;
  }

  public getString(key: string, defaultValue?: string): string {
    const value = this.get(key);
    if (value === undefined) {
      if (defaultValue !== undefined) return defaultValue;
      throw new Error(`Environment variable ${key} is missing and no default value provided.`);
    }
    return value;
  }
}
