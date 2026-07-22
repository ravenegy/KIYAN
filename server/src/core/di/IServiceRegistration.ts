import { Token } from "./Token";
import { Lifetime, Factory } from "./IContainer";

export interface IServiceRegistration<T> {
  token: Token<T>;
  factory: Factory<T>;
  lifetime: Lifetime;
  instance?: T;
}
