import { Token } from "./Token";

export enum Lifetime {
  Singleton = "Singleton",
  Scoped = "Scoped",
  Transient = "Transient",
}

export type Factory<T> = (container: IContainer) => T;

export interface IContainer {
  register<T>(token: Token<T>, factory: Factory<T>, lifetime?: Lifetime): void;
  registerInstance<T>(token: Token<T>, instance: T): void;
  registerAlias<T, K extends T>(token: Token<T>, aliasToken: Token<K>): void;
  resolve<T>(token: Token<T>): T;
  createScope(): IContainer;
  dispose(): Promise<void>;
}
