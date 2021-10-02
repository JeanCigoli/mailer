export interface HttpRequest {
  headers?: any;
  body?: any;
  query?: any;
  params?: any;
  authData: AuthData;
  token: TokenData;
}

export interface HttpResponse {
  statusCode: number;
  body?: any;
  headers?: any;
}
