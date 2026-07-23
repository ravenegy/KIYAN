export interface IResponse {
  status(code: number): IResponse;
  json(data: unknown): void;
}
