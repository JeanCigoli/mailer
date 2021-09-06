import {
  GetUserConsumption,
  HttpClient,
} from '../../../../../data/protocols/core/http';

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
