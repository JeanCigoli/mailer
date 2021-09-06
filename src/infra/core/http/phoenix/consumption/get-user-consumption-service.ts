import { GetUserConsumption } from '../../../../../data/protocols/core/http/get-user-consumption';
import { HttpClient } from '../../../../../data/protocols/core/http/web-service-rest-adapter';
import { formateSnakeCaseKeysForCamelCase } from '../../../../../utils/object';

export class GetUserConsumptionService implements GetUserConsumption {
  constructor(private readonly httpClient: HttpClient) {}

  async get(clientToken: string): GetUserConsumption.Result {
    const result = await this.httpClient.request({
      method: 'GET',
      url: '/consumptions',
      headers: {
        Authorization: clientToken,
      },
    });

    if (result.statusCode > 299) {
      return {
        status: false,
      };
    }

    return {
      status: true,
      payload: formateSnakeCaseKeysForCamelCase(result.body.payload),
    };
  }
}
