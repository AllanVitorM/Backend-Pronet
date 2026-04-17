export interface HttpRequest {
  params?: any;
  headers?: any;
  body?: any;
  query?: any;
  logged?: any;
}

export interface HttpResponse {
  statusCode: number;
  body?: any;
}

export interface Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}

export interface Middleware {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
