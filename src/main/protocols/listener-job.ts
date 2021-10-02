import { HttpResponse } from '../../presentation/protocols';

export interface Job {
  handle(message: Record<string, any>, next?: Function): Promise<void>;
}

export interface HttpRequest {
  body?: any;
  headers?: any;
}

export interface MiddlewareJob<T = any> {
  handle: (...params: Middleware.Params) => Middleware.Result;
}

export namespace Middleware {
  export type Params = [httpRequest: HttpRequest, next: Function];
  export type Result = Promise<HttpResponse>;
}
