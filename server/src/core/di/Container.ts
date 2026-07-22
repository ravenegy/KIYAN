import { Token } from "./Token";
import { IContainer, Lifetime, Factory } from "./IContainer";
import { IServiceRegistration } from "./IServiceRegistration";

export class CircularDependencyException extends Error {
  constructor(tokenName: string) {
    super(`Circular dependency detected resolving: ${tokenName}`);
    this.name = "CircularDependencyException";
  }
}

export class Container implements IContainer {
  private registrations = new Map<symbol, IServiceRegistration<unknown>>();
  private scopedInstances = new Map<symbol, unknown>();
  private aliases = new Map<symbol, symbol>();
  
  constructor(
    private parent?: Container,
    private readonly root?: Container
  ) {
    if (!this.root && parent) {
      this.root = parent.root || parent;
    }
  }

  public register<T>(token: Token<T>, factory: Factory<T>, lifetime: Lifetime = Lifetime.Transient): void {
    if (this.parent) {
      throw new Error("Cannot register services in a scoped container. Register in the root container.");
    }
    this.registrations.set(token.symbol, {
      token: token as unknown as Token<unknown>,
      factory: factory as unknown as Factory<unknown>,
      lifetime,
    });
  }

  public registerInstance<T>(token: Token<T>, instance: T): void {
    if (this.parent) {
      throw new Error("Cannot register instances in a scoped container. Register in the root container.");
    }
    this.registrations.set(token.symbol, {
      token: token as unknown as Token<unknown>,
      factory: () => instance,
      lifetime: Lifetime.Singleton,
      instance,
    });
  }

  public registerAlias<T, K extends T>(token: Token<T>, aliasToken: Token<K>): void {
    if (this.parent) {
      throw new Error("Cannot register aliases in a scoped container.");
    }
    this.aliases.set(token.symbol, aliasToken.symbol);
  }

  public resolve<T>(token: Token<T>, resolutionStack: Set<symbol> = new Set()): T {
    const actualSymbol = this.resolveAlias(token.symbol);
    
    if (resolutionStack.has(actualSymbol)) {
      throw new CircularDependencyException(token.name);
    }

    // Lookup registration from root (since only root has registrations)
    const rootContainer = this.root || this;
    const registration = rootContainer.registrations.get(actualSymbol) as IServiceRegistration<T> | undefined;

    if (!registration) {
      throw new Error(`No registration found for token: ${token.name}`);
    }

    resolutionStack.add(actualSymbol);

    let instance: T;

    switch (registration.lifetime) {
      case Lifetime.Singleton:
        instance = this.resolveSingleton(registration, resolutionStack, rootContainer);
        break;
      case Lifetime.Scoped:
        instance = this.resolveScoped(registration, resolutionStack);
        break;
      case Lifetime.Transient:
        instance = registration.factory(this) as T;
        break;
      default:
        throw new Error(`Unknown lifetime: ${registration.lifetime}`);
    }

    resolutionStack.delete(actualSymbol);
    return instance;
  }

  private resolveAlias(symbol: symbol): symbol {
    const rootContainer = this.root || this;
    let current = symbol;
    while (rootContainer.aliases.has(current)) {
      current = rootContainer.aliases.get(current)!;
    }
    return current;
  }

  private resolveSingleton<T>(
    registration: IServiceRegistration<T>,
    resolutionStack: Set<symbol>,
    rootContainer: Container
  ): T {
    if (registration.instance !== undefined) {
      return registration.instance;
    }
    
    // Evaluate factory in root scope for Singleton
    const instance = registration.factory(rootContainer) as T;
    registration.instance = instance;
    return instance;
  }

  private resolveScoped<T>(
    registration: IServiceRegistration<T>,
    resolutionStack: Set<symbol>
  ): T {
    const symbol = registration.token.symbol;
    if (this.scopedInstances.has(symbol)) {
      return this.scopedInstances.get(symbol) as T;
    }

    const instance = registration.factory(this) as T;
    this.scopedInstances.set(symbol, instance);
    return instance;
  }

  public createScope(): IContainer {
    return new Container(this, this.root || this);
  }

  public async dispose(): Promise<void> {
    for (const instance of Array.from(this.scopedInstances.values())) {
      if (typeof instance === 'object' && instance !== null && 'dispose' in instance) {
        const disposable = instance as { dispose: () => unknown };
        if (typeof disposable.dispose === 'function') {
          const result = disposable.dispose();
          if (result instanceof Promise) {
            await result;
          }
        }
      }
    }
    this.scopedInstances.clear();

    if (!this.parent) {
      // Root container disposal - dispose singletons
      for (const reg of Array.from(this.registrations.values())) {
        if (reg.lifetime === Lifetime.Singleton && reg.instance !== undefined) {
          const instance = reg.instance;
          if (typeof instance === 'object' && instance !== null && 'dispose' in instance) {
            const disposable = instance as { dispose: () => unknown };
            if (typeof disposable.dispose === 'function') {
              const result = disposable.dispose();
              if (result instanceof Promise) {
                await result;
              }
            }
          }
        }
      }
      this.registrations.clear();
      this.aliases.clear();
    }
  }
}
