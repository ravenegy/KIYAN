export class SharedDomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SharedDomainException';
  }
}
