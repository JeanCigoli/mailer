import { GetUserConsumption } from '../../../../../data/protocols/core/http/get-user-consumption';
import { HttpClient } from '../../../../../data/protocols/core/http/web-service-rest-adapter';
import { makeObjectToParamsRequest } from '../../../../../utils';
import {
  formateCamelCaseKeysForSnakeCase,
  formateSnakeCaseKeysForCamelCase,
} from '../../../../../utils/object';

export class GetUserConsumptionService implements GetUserConsumption {
  constructor(private readonly httpClient: HttpClient) {}

  async get(params: GetUserConsumption.Params): GetUserConsumption.Result {
    const { token, ...props } = params;

    // const result = await this.httpClient.request({
    //   method: 'GET',
    //   url: `v1/consumptions?${makeObjectToParamsRequest(
    //     formateCamelCaseKeysForSnakeCase(props),
    //   )}`,
    //   headers: {
    //     Authorization: token,
    //   },
    // });

    const result = await this.httpClient.request({
      method: 'GET',
      url: `v1/consumptions`,
      headers: {
        Authorization: token,
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
