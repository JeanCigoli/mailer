import { AxiosInstance, AxiosResponse } from 'axios';
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '../../../data/protocols/core/http/web-service-rest-adapter';

export class RequestAdapter implements HttpClient {
  constructor(private readonly axios: AxiosInstance) {}

  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;

    try {
      axiosResponse = await this.axios({
        data: data?.body,
        ...data,
      });
    } catch (error: any) {
      console.log(error);
      axiosResponse = error.response;
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
