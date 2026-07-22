export interface IFeatureRegistry {
  register(feature: string, defaultState?: boolean): void;
  enable(feature: string): void;
  disable(feature: string): void;
  toggle(feature: string): void;
  isEnabled(feature: string): boolean;
  snapshot(): Record<string, boolean>;
}

export class FeatureRegistry implements IFeatureRegistry {
  private features = new Map<string, boolean>();

  public register(feature: string, defaultState: boolean = false): void {
    if (!this.features.has(feature)) {
      this.features.set(feature, defaultState);
    }
  }

  public enable(feature: string): void {
    this.ensureRegistered(feature);
    this.features.set(feature, true);
  }

  public disable(feature: string): void {
    this.ensureRegistered(feature);
    this.features.set(feature, false);
  }

  public toggle(feature: string): void {
    this.ensureRegistered(feature);
    this.features.set(feature, !this.features.get(feature));
  }

  public isEnabled(feature: string): boolean {
    this.ensureRegistered(feature);
    return this.features.get(feature)!;
  }

  public snapshot(): Record<string, boolean> {
    return Object.fromEntries(this.features.entries());
  }

  private ensureRegistered(feature: string): void {
    if (!this.features.has(feature)) {
      throw new Error(`Feature '${feature}' is not registered.`);
    }
  }
}
