import { middlewareSystemAdapter } from './adapt-middleware-system';

export function listenerMiddlewareAdapter(...args: Function[]) {
  return async (message: object) => {
    return await middlewareSystemAdapter(message)(...args)();
  };
}
