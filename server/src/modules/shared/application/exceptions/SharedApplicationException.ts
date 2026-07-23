export class SharedApplicationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SharedApplicationException';
  }
}
