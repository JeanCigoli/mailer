import { GetPlanValues } from '../../../../../data/protocols/core/http/get-plan-values';
import { HttpClient } from '../../../../../data/protocols/core/http/web-service-rest-adapter';
import { formateSnakeCaseKeysForCamelCase } from '../../../../../utils/object';

export class GetPlanValuesService implements GetPlanValues {
  constructor(private readonly httpClient: HttpClient) {}

  async getAllValues(clientToken: string): GetPlanValues.Result {
    const result = await this.httpClient.request({
      method: 'GET',
      url: 'v1/plans',
      headers: {
        Authentication: clientToken,
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
