export interface IRouter {
  get(path: string, handler: Function): void;
  post(path: string, handler: Function): void;
  put(path: string, handler: Function): void;
  delete(path: string, handler: Function): void;
}
