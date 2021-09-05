import { GetUserConsumption } from '../../../../../data/protocols/core/http/get-user-consumption';
import { HttpClient } from '../../../../../data/protocols/core/http/web-service-rest-adapter';

export class GetUserConsumptionHttp implements GetUserConsumption {
  constructor(private readonly httpClient: HttpClient) {}

  async get(params: GetUserConsumption.Params): GetUserConsumption.Result {
    const result = await this.httpClient.request({
      method: 'GET',
      url: '/consumptions',
      headers: {
        Authorization: params.clientToken,
      },
    });

    return result.body;
  }
}
