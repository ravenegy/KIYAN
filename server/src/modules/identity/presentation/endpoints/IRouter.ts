export interface IRequest {
  readonly body: Record<string, unknown>;
  readonly params: Record<string, string>;
  readonly query: Record<string, string>;
}

export interface IResponse {
  status(code: number): IResponse;
  json(data: unknown): void;
}

export type RequestHandler = (req: IRequest, res: IResponse) => Promise<void> | void;

export interface IRouter {
  post(path: string, handler: RequestHandler): void;
  get(path: string, handler: RequestHandler): void;
  put(path: string, handler: RequestHandler): void;
  delete(path: string, handler: RequestHandler): void;
  patch(path: string, handler: RequestHandler): void;
}
