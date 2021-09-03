import { HttpRequest, HttpResponse } from './http';

export interface Middleware<T = any> {
  handle: (...params: Middleware.Params) => Middleware.Result;
}

export namespace Middleware {
  export type Params = [httpRequest: HttpRequest, next: Function];
  export type Result = Promise<HttpResponse>;
}
