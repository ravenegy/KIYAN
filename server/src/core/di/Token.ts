export class Token<T> {
  public readonly symbol: symbol;
  public readonly name: string;
  // This is a phantom property to retain the type information
  private readonly _typePhantom?: T;

  constructor(name: string) {
    this.name = name;
    this.symbol = Symbol(name);
  }
}
